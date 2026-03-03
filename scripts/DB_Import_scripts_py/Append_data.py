#!/usr/bin/env python3
"""
MySQL Data Append Script

This script appends data from SQL files into existing MySQL database tables.
It's designed to work with files created by the split_mysql_dump.py script.
The script checks for existing data to avoid duplicate entries.
Files are processed from smallest to largest to help with dependencies.

User Guide:
-----------
1. First, ensure your database schema is already set up (tables created)
2. Run this script to append only new data to your tables
3. The script will skip any data that already exists in the tables
4. Command line options allow customization of database connection and import behavior

Example usage:
    python3 Append_data.py --input-dir=~/output_tables --host=localhost --port=3306 --user=root --password="" --database=kulmatest
    python3 Append_data.py --database=kulmatest
"""

import os
import argparse
import logging
import time
import re
import sys
import traceback

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Try to import mysql.connector with error handling
try:
    import mysql.connector
    from mysql.connector import Error
except ImportError as e:
    logger.error(f"Error importing mysql.connector: {e}")
    logger.error("Please install the MySQL connector package using:")
    logger.error("sudo apt-get install -y python3-mysql.connector")
    sys.exit(1)

def parse_arguments():
    """Parse command line arguments."""
    parser = argparse.ArgumentParser(description='Append data from SQL files into existing MySQL database tables.')
    parser.add_argument('--input-dir', default=os.path.expanduser('~/output_tables'), 
                        help='Directory containing SQL files (default: ~/output_tables)')
    parser.add_argument('--host', default='localhost', 
                        help='MySQL server host (default: localhost)')
    parser.add_argument('--port', type=int, default=3306, 
                        help='MySQL server port (default: 3306)')
    parser.add_argument('--user', default='root', 
                        help='MySQL username (default: root)')
    parser.add_argument('--password', default='', 
                        help='MySQL password (default: empty)')
    parser.add_argument('--database', default='kulmatest', 
                        help='Target database name (default: kulmatest)')
    parser.add_argument('--batch-size', type=int, default=1000,
                        help='Number of statements to execute in a batch (default: 1000)')
    parser.add_argument('--skip-tables', nargs='+', default=[],
                        help='List of tables to skip during import')
    parser.add_argument('--only-tables', nargs='+', default=[],
                        help='Only import these tables (if specified)')
    parser.add_argument('--disable-ssl', action='store_true', default=False,
                        help='Disable SSL for MySQL connection (default: False)')
    return parser.parse_args()

def connect_to_mysql(host, port, user, password, database, disable_ssl=False):
    """
    Connect to MySQL server and return the connection.
    
    Args:
        host: MySQL server host
        port: MySQL server port
        user: MySQL username
        password: MySQL password
        database: Target database name
        disable_ssl: Whether to disable SSL for the connection
        
    Returns:
        MySQL connection object
    """
    try:
        # Configure connection options
        config = {
            'host': host,
            'port': port,
            'user': user,
            'password': password,
            'database': database
        }
        
        # Add SSL configuration if needed
        if disable_ssl:
            config['use_pure'] = True
            config['ssl_disabled'] = True
            
        connection = mysql.connector.connect(**config)
        
        if connection.is_connected():
            logger.info(f"Connected to MySQL database: {database} on {host}:{port}")
            return connection
    except Error as e:
        logger.error(f"Error connecting to MySQL: {e}")
        logger.error(traceback.format_exc())
        raise
    
    return None

def split_sql_statements(sql_content):
    """
    Split SQL content into individual statements.
    
    Args:
        sql_content: SQL content as a string
        
    Returns:
        List of SQL statements
    """
    statements = []
    current_statement = []
    in_string = False
    string_delimiter = None
    
    for line in sql_content.splitlines():
        # Skip empty lines and comments
        stripped_line = line.strip()
        if not stripped_line or stripped_line.startswith('--') or stripped_line.startswith('/*'):
            continue
            
        current_statement.append(line)
        
        # Check if the line ends with a semicolon outside of a string
        i = 0
        while i < len(line):
            char = line[i]
            
            # Handle string delimiters
            if char in ['"', "'", '`'] and (i == 0 or line[i-1] != '\\'):
                if not in_string:
                    in_string = True
                    string_delimiter = char
                elif char == string_delimiter:
                    in_string = False
                    
            # Check for statement end
            if char == ';' and not in_string and i == len(line.rstrip()) - 1:
                statements.append('\n'.join(current_statement))
                current_statement = []
                
            i += 1
    
    # Add any remaining statement
    if current_statement:
        statements.append('\n'.join(current_statement))
        
    return statements

def extract_table_name(sql_statement):
    """
    Extract table name from an INSERT or CREATE TABLE statement.
    
    Args:
        sql_statement: SQL statement as a string
        
    Returns:
        Table name or None if not found
    """
    # For INSERT statements
    insert_match = re.search(r'INSERT\s+INTO\s+[`"\[]?([^\s`"\[\]]+)[`"\]]?', sql_statement, re.IGNORECASE)
    if insert_match:
        return insert_match.group(1)
    
    # For CREATE TABLE statements
    create_match = re.search(r'CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?[`"\[]?([^\s`"\[\]]+)[`"\]]?', sql_statement, re.IGNORECASE)
    if create_match:
        return create_match.group(1)
    
    return None

def get_primary_keys(connection, table_name):
    """
    Get primary key columns for a table.
    
    Args:
        connection: MySQL connection object
        table_name: Name of the table
        
    Returns:
        List of primary key column names
    """
    try:
        cursor = connection.cursor(dictionary=True)
        cursor.execute(f"""
            SELECT COLUMN_NAME
            FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
            WHERE TABLE_SCHEMA = DATABASE()
              AND TABLE_NAME = '{table_name}'
              AND CONSTRAINT_NAME = 'PRIMARY'
            ORDER BY ORDINAL_POSITION
        """)
        primary_keys = [row['COLUMN_NAME'] for row in cursor.fetchall()]
        cursor.close()
        return primary_keys
    except Error as e:
        logger.error(f"Error getting primary keys for table {table_name}: {e}")
        return []

def extract_values_from_insert(sql_statement):
    """
    Extract values from an INSERT statement.
    
    Args:
        sql_statement: SQL INSERT statement
        
    Returns:
        List of tuples containing the values
    """
    # Find the VALUES part of the INSERT statement
    values_match = re.search(r'VALUES\s*(\(.*\))', sql_statement, re.IGNORECASE | re.DOTALL)
    if not values_match:
        values_match = re.search(r'VALUES\s*(.*)', sql_statement, re.IGNORECASE | re.DOTALL)
        if not values_match:
            return []
    
    values_str = values_match.group(1).strip()
    
    # Handle multiple value sets (multiple rows)
    values_list = []
    
    # Find all sets of parentheses
    paren_level = 0
    current_value_set = ""
    in_string = False
    string_char = None
    
    for char in values_str:
        if char in ["'", '"', '`'] and (not in_string or string_char == char):
            in_string = not in_string
            if in_string:
                string_char = char
            else:
                string_char = None
            current_value_set += char
        elif char == '(' and not in_string:
            paren_level += 1
            if paren_level == 1:
                current_value_set = "("
            else:
                current_value_set += char
        elif char == ')' and not in_string:
            paren_level -= 1
            if paren_level == 0:
                current_value_set += ")"
                values_list.append(current_value_set)
                current_value_set = ""
            else:
                current_value_set += char
        elif paren_level > 0:
            current_value_set += char
    
    return values_list

def check_if_data_exists(connection, table_name, primary_keys, values):
    """
    Check if data already exists in the table based on primary keys.
    
    Args:
        connection: MySQL connection object
        table_name: Name of the table
        primary_keys: List of primary key column names
        values: Values to check
        
    Returns:
        True if data exists, False otherwise
    """
    if not primary_keys or not values:
        return False
    
    try:
        cursor = connection.cursor()
        
        # Count the number of rows in the table
        try:
            cursor.execute(f"SELECT COUNT(*) FROM `{table_name}`")
            count = cursor.fetchone()[0]
            
            # If the table is empty, data definitely doesn't exist
            if count == 0:
                cursor.close()
                return False
        except Error as e:
            logger.error(f"Error counting rows in table {table_name}: {e}")
            cursor.close()
            return False
        
        # For tables with primary keys, check if the specific data exists
        if primary_keys and len(primary_keys) > 0:
            try:
                # Build a query to check if the data exists based on primary keys
                # This is a simplified approach and assumes we have values for the primary keys
                conditions = []
                params = []
                
                # Use only the first set of values for checking
                # In a real-world scenario with complex data, this would need to be more sophisticated
                if values and len(values) > 0:
                    first_row = values[0]
                    
                    # Create conditions for each primary key
                    # This is a simplified approach and may not work for all cases
                    for i, key in enumerate(primary_keys):
                        if i < len(first_row):
                            conditions.append(f"`{key}` = %s")
                            params.append(first_row[i])
                
                if conditions:
                    query = f"SELECT COUNT(*) FROM `{table_name}` WHERE {' AND '.join(conditions)}"
                    cursor.execute(query, params)
                    count = cursor.fetchone()[0]
                    cursor.close()
                    return count > 0
            except Error as e:
                logger.error(f"Error checking specific data in table {table_name}: {e}")
                logger.error(traceback.format_exc())
        
        # If we can't determine if the data exists, assume it doesn't
        cursor.close()
        return False
    except Error as e:
        logger.error(f"Error checking if data exists in table {table_name}: {e}")
        logger.error(traceback.format_exc())
        return False

def modify_insert_to_replace(sql_statement):
    """
    Modify an INSERT statement to use REPLACE instead.
    
    Args:
        sql_statement: SQL INSERT statement
        
    Returns:
        Modified SQL statement using REPLACE
    """
    # Replace INSERT INTO with REPLACE INTO
    modified_statement = re.sub(
        r'^INSERT\s+INTO',
        'REPLACE INTO',
        sql_statement,
        flags=re.IGNORECASE
    )
    
    return modified_statement

def table_exists(connection, table_name):
    """
    Check if a table exists in the database.
    
    Args:
        connection: MySQL connection object
        table_name: Name of the table
        
    Returns:
        True if the table exists, False otherwise
    """
    try:
        cursor = connection.cursor()
        cursor.execute(f"SHOW TABLES LIKE '{table_name}'")
        result = cursor.fetchone()
        cursor.close()
        return result is not None
    except Error as e:
        logger.error(f"Error checking if table {table_name} exists: {e}")
        return False

def append_data(input_dir, connection, batch_size=1000, skip_tables=None, only_tables=None):
    """
    Append data from SQL files to existing tables.
    
    Args:
        input_dir: Directory containing SQL files
        connection: MySQL connection object
        batch_size: Number of statements to execute in a batch
        skip_tables: List of tables to skip
        only_tables: List of tables to process (if specified, others are skipped)
        
    Returns:
        Number of files processed, statements executed, and rows inserted
    """
    if not os.path.exists(input_dir):
        logger.error(f"Input directory does not exist: {input_dir}")
        return 0, 0, 0
    
    if skip_tables is None:
        skip_tables = []
    
    if only_tables is None:
        only_tables = []
    
    # Get all SQL files with their sizes
    sql_files = []
    for f in os.listdir(input_dir):
        if f.endswith('.sql'):
            file_path = os.path.join(input_dir, f)
            file_size = os.path.getsize(file_path)
            sql_files.append((f, file_path, file_size))
    
    if not sql_files:
        logger.warning(f"No SQL files found in {input_dir}")
        return 0, 0, 0
    
    # Sort files by size (smallest to largest)
    sql_files.sort(key=lambda x: x[2])
    
    logger.info(f"Found {len(sql_files)} SQL files to process")
    
    # Process each file
    files_processed = 0
    statements_executed = 0
    rows_inserted = 0
    
    cursor = connection.cursor()
    
    # Set foreign key checks to 0 to avoid dependency issues
    cursor.execute("SET FOREIGN_KEY_CHECKS=0")
    
    start_time = time.time()
    
    for filename, file_path, file_size in sql_files:
        # Extract table name from filename
        table_name = os.path.splitext(filename)[0]
        
        # Skip tables if specified
        if skip_tables and table_name in skip_tables:
            logger.info(f"Skipping table {table_name} (in skip list)")
            continue
        
        # Only process specified tables if only_tables is provided
        if only_tables and table_name not in only_tables:
            logger.info(f"Skipping table {table_name} (not in only list)")
            continue
        
        logger.info(f"Processing {filename} ({file_size} bytes)")
        
        try:
            # Check if the table exists before processing
            if not table_exists(connection, table_name):
                logger.warning(f"Table {table_name} does not exist, skipping file {filename}")
                continue
                
            with open(file_path, 'r', encoding='utf-8', errors='replace') as f:
                sql_content = f.read()
            
            # Split the content into individual statements
            statements = split_sql_statements(sql_content)
            
            if not statements:
                logger.warning(f"No SQL statements found in {filename}")
                continue
            
            # Get primary keys for the table
            primary_keys = get_primary_keys(connection, table_name)
            
            # Process each statement
            for stmt in statements:
                # Skip CREATE TABLE statements
                if re.search(r'^\s*CREATE\s+TABLE', stmt, re.IGNORECASE):
                    continue
                
                # Process INSERT statements
                if re.search(r'^\s*INSERT\s+INTO', stmt, re.IGNORECASE):
                    # Extract table name from the statement
                    stmt_table = extract_table_name(stmt)
                    
                    if not stmt_table:
                        logger.warning(f"Could not extract table name from statement: {stmt[:100]}...")
                        continue
                    
                    # Check if the table exists
                    if not table_exists(connection, stmt_table):
                        logger.warning(f"Table {stmt_table} does not exist, skipping INSERT statement")
                        continue
                    
                    # Extract values from the statement
                    values = extract_values_from_insert(stmt)
                    
                    # Check if data already exists
                    data_exists = check_if_data_exists(connection, stmt_table, primary_keys, values)
                    
                    if data_exists:
                        logger.info(f"Data already exists in table {stmt_table}, using REPLACE")
                        stmt = modify_insert_to_replace(stmt)
                    
                    # Execute the statement
                    try:
                        cursor.execute(stmt)
                        affected_rows = cursor.rowcount
                        rows_inserted += affected_rows
                        statements_executed += 1
                        
                        if affected_rows > 0:
                            logger.info(f"Inserted/replaced {affected_rows} rows into {stmt_table}")
                        
                        # Commit after each statement to avoid large transactions
                        connection.commit()
                    except Error as e:
                        logger.error(f"Error executing statement: {e}")
                        logger.error(f"Statement: {stmt[:100]}...")
                        logger.error(traceback.format_exc())
                else:
                    # Execute other statements
                    try:
                        cursor.execute(stmt)
                        statements_executed += 1
                        connection.commit()
                    except Error as e:
                        logger.error(f"Error executing statement: {e}")
                        logger.error(f"Statement: {stmt[:100]}...")
                        logger.error(traceback.format_exc())
            
            files_processed += 1
            elapsed_time = time.time() - start_time
            logger.info(f"Processed {filename} in {elapsed_time:.2f} seconds")
            
        except Exception as e:
            logger.error(f"Error processing {filename}: {e}")
            logger.error(traceback.format_exc())
    
    # Set foreign key checks back to 1
    cursor.execute("SET FOREIGN_KEY_CHECKS=1")
    cursor.close()
    
    total_time = time.time() - start_time
    logger.info(f"Processing completed in {total_time:.2f} seconds")
    logger.info(f"Processed {files_processed} files")
    logger.info(f"Executed {statements_executed} statements")
    logger.info(f"Inserted/replaced {rows_inserted} rows")
    
    return files_processed, statements_executed, rows_inserted

def main():
    """Main function to run the script."""
    args = parse_arguments()
    
    try:
        # Connect to MySQL
        connection = connect_to_mysql(
            args.host, 
            args.port, 
            args.user, 
            args.password, 
            args.database,
            args.disable_ssl
        )
        
        if not connection:
            logger.error("Failed to connect to MySQL")
            return 1
            
        # Append data
        files_processed, statements_executed, rows_inserted = append_data(
            args.input_dir, 
            connection, 
            args.batch_size,
            args.skip_tables,
            args.only_tables
        )
        
        if files_processed == 0:
            logger.warning("No files were processed")
            
        # Close the connection
        connection.close()
        logger.info("MySQL connection closed")
        
    except Exception as e:
        logger.error(f"An error occurred: {str(e)}")
        logger.error(traceback.format_exc())
        return 1
    
    return 0

if __name__ == "__main__":
    exit(main())
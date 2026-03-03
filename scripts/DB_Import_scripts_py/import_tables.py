#!/usr/bin/env python3
"""
MySQL Table Import Script

This script imports SQL files from a directory into a MySQL database.
It's designed to work with files created by the split_mysql_dump.py script.
Files are imported from smallest to largest to help with dependencies.
The script will skip any existing data to avoid duplicates.

Usage Guide:
    This script requires the following arguments:
    - --input-dir: The directory containing the SQL files to be imported.
    - --host: The hostname or IP address of the MySQL server.
    - --port: The port number of the MySQL server.
    - --user: The username to use for the MySQL connection.
    - --password: The password to use for the MySQL connection.
    - --database: The name of the database to import the SQL files into.
    - --create-database: An optional flag to create the database if it does not exist.
    - --batch-size: The number of SQL statements to execute in a batch.

Example Syntax:
    python3 import_tables.py --input-dir ~/output_tables --host localhost --port 3306 --user root --password mypassword --database kulmatest --create-database --batch-size 1000
    python3 import_tables.py --input-dir ~/output_tables --database kulmatest
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
    parser = argparse.ArgumentParser(description='Import SQL files into a MySQL database.')
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
    parser.add_argument('--create-database', action='store_true',
                        help='Create the database if it does not exist')
    parser.add_argument('--batch-size', type=int, default=1000,
                        help='Number of statements to execute in a batch (default: 1000)')
    parser.add_argument('--skip-existing', action='store_true', default=True,
                        help='Skip existing data to avoid duplicates (default: True)')
    parser.add_argument('--disable-ssl', action='store_true', default=False,
                        help='Disable SSL for MySQL connection (default: False)')
    parser.add_argument('--force-create-tables', action='store_true', default=False,
                        help='Force creation of all tables even if they exist (default: False)')
    return parser.parse_args()

def connect_to_mysql(host, port, user, password, database=None, create_database=False, disable_ssl=False):
    """
    Connect to MySQL server and return the connection.
    
    Args:
        host: MySQL server host
        port: MySQL server port
        user: MySQL username
        password: MySQL password
        database: Target database name (optional)
        create_database: Whether to create the database if it doesn't exist
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
            'password': password
        }
        
        # Add SSL configuration if needed
        if disable_ssl:
            config['use_pure'] = True
            config['ssl_disabled'] = True
        
        # First connect without specifying a database
        connection = mysql.connector.connect(**config)
        
        if connection.is_connected():
            logger.info(f"Connected to MySQL server: {host}:{port}")
            
            # Create database if requested and it doesn't exist
            if database and create_database:
                cursor = connection.cursor()
                # Check if database exists
                cursor.execute("SHOW DATABASES")
                databases = [db[0] for db in cursor.fetchall()]
                
                if database.lower() not in [db.lower() for db in databases]:
                    cursor.execute(f"CREATE DATABASE `{database}`")
                    logger.info(f"Database '{database}' created")
                else:
                    logger.info(f"Database '{database}' already exists")
                cursor.close()
            
            # If database is specified, reconnect with the database
            if database:
                connection.close()
                config['database'] = database
                connection = mysql.connector.connect(**config)
                logger.info(f"Connected to database: {database}")
                
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

def extract_create_table_statements(input_dir):
    """
    Extract all CREATE TABLE statements from all SQL files.
    
    Args:
        input_dir: Directory containing SQL files
        
    Returns:
        Dictionary mapping table names to CREATE TABLE statements
    """
    create_table_statements = {}
    
    if not os.path.exists(input_dir):
        logger.error(f"Input directory does not exist: {input_dir}")
        return create_table_statements
    
    # Get all SQL files
    sql_files = []
    for f in os.listdir(input_dir):
        if f.endswith('.sql'):
            file_path = os.path.join(input_dir, f)
            sql_files.append(file_path)
    
    if not sql_files:
        logger.warning(f"No SQL files found in {input_dir}")
        return create_table_statements
    
    # Process each file to extract CREATE TABLE statements
    for file_path in sql_files:
        try:
            with open(file_path, 'r', encoding='utf-8', errors='replace') as f:
                sql_content = f.read()
            
            # Split the content into individual statements
            statements = split_sql_statements(sql_content)
            
            # Extract CREATE TABLE statements
            for stmt in statements:
                # Use a case-insensitive check for CREATE TABLE statements
                if re.search(r'^\s*CREATE\s+TABLE', stmt, re.IGNORECASE):
                    table_name = extract_table_name(stmt)
                    if table_name:
                        # Ensure the statement has IF NOT EXISTS
                        if 'IF NOT EXISTS' not in stmt.upper():
                            # Add IF NOT EXISTS to the CREATE TABLE statement
                            stmt = re.sub(
                                r'(CREATE\s+TABLE\s+)(`?)(\w+)(`?)',
                                r'\1IF NOT EXISTS \2\3\4',
                                stmt,
                                flags=re.IGNORECASE
                            )
                        create_table_statements[table_name] = stmt
                        logger.debug(f"Extracted CREATE TABLE statement for table: {table_name}")
        except Exception as e:
            logger.error(f"Error processing file {file_path}: {e}")
            logger.error(traceback.format_exc())
    
    logger.info(f"Extracted {len(create_table_statements)} CREATE TABLE statements")
    return create_table_statements

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

def table_exists(connection, table_name):
    """
    Check if a table exists in the database.
    
    Args:
        connection: MySQL connection object
        table_name: Name of the table to check
        
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

def table_has_data(connection, table_name):
    """
    Check if a table has any data.
    
    Args:
        connection: MySQL connection object
        table_name: Name of the table to check
        
    Returns:
        True if the table has data, False otherwise
    """
    try:
        cursor = connection.cursor()
        cursor.execute(f"SELECT 1 FROM `{table_name}` LIMIT 1")
        result = cursor.fetchone()
        cursor.close()
        return result is not None
    except Error as e:
        logger.error(f"Error checking if table {table_name} has data: {e}")
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

def create_tables(connection, create_table_statements, force_create=False):
    """
    Create tables using the extracted CREATE TABLE statements.
    
    Args:
        connection: MySQL connection object
        create_table_statements: Dictionary mapping table names to CREATE TABLE statements
        force_create: Whether to force creation of tables even if they exist
        
    Returns:
        Number of tables created
    """
    tables_created = 0
    cursor = connection.cursor()
    
    # Set foreign key checks to 0 to avoid dependency issues
    cursor.execute("SET FOREIGN_KEY_CHECKS=0")
    
    # Sort table names to help with dependencies (tables referenced by foreign keys should be created first)
    # This is a simple approach - a more complex approach would analyze the foreign key relationships
    table_names = sorted(create_table_statements.keys())
    
    for table_name in table_names:
        stmt = create_table_statements[table_name]
        try:
            if force_create or not table_exists(connection, table_name):
                # Drop the table if it exists and force_create is True
                if force_create and table_exists(connection, table_name):
                    cursor.execute(f"DROP TABLE IF EXISTS `{table_name}`")
                    logger.info(f"Dropped existing table: {table_name}")
                
                # Create the table
                logger.info(f"Creating table: {table_name}")
                cursor.execute(stmt)
                tables_created += 1
                logger.info(f"Created table: {table_name}")
                connection.commit()
            else:
                logger.info(f"Table {table_name} already exists, skipping creation")
        except Error as e:
            logger.error(f"Error creating table {table_name}: {e}")
            logger.error(f"Statement: {stmt[:200]}...")
            logger.error(traceback.format_exc())
            # Continue with other tables even if one fails
    
    # Set foreign key checks back to 1
    cursor.execute("SET FOREIGN_KEY_CHECKS=1")
    cursor.close()
    
    return tables_created

def apply_database_settings(connection, database_name, settings_file):
    """
    Apply database settings from a settings file.
    
    Args:
        connection: MySQL connection object
        database_name: Name of the database to apply settings to
        settings_file: Path to the file containing database settings
        
    Returns:
        Number of settings applied
    """
    if not os.path.exists(settings_file):
        logger.info(f"Database settings file not found: {settings_file}")
        return 0
        
    settings_applied = 0
    
    try:
        with open(settings_file, 'r', encoding='utf-8', errors='replace') as f:
            settings_content = f.read()
            
        # Replace database name if needed (in case the original dump had a different DB name)
        original_db_pattern = re.compile(r'`([^`]+)`\.', re.IGNORECASE)
        matches = original_db_pattern.findall(settings_content)
        if matches:
            original_db_name = matches[0]
            settings_content = settings_content.replace(f"`{original_db_name}`.", f"`{database_name}`.")
            logger.info(f"Replaced original database name '{original_db_name}' with '{database_name}' in settings")
        
        # Split into statements
        statements = split_sql_statements(settings_content)
        
        cursor = connection.cursor()
        
        for stmt in statements:
            # Skip CREATE DATABASE statements if the database already exists
            if re.search(r'CREATE\s+DATABASE', stmt, re.IGNORECASE):
                logger.info(f"Skipping CREATE DATABASE statement as database already exists")
                continue
                
            # Apply other settings
            if re.search(r'ALTER\s+DATABASE|SET\s+', stmt, re.IGNORECASE):
                try:
                    cursor.execute(stmt)
                    settings_applied += 1
                    logger.info(f"Applied database setting: {stmt[:50]}...")
                except Error as e:
                    logger.error(f"Error applying database setting: {e}")
                    logger.error(f"Statement: {stmt[:100]}...")
        
        connection.commit()
        cursor.close()
        logger.info(f"Applied {settings_applied} database settings successfully")
    except Exception as e:
        logger.error(f"Error applying database settings: {e}")
        logger.error(traceback.format_exc())
    
    return settings_applied

def import_tables(input_dir, connection, batch_size=1000, skip_existing=True, force_create_tables=False):
    """
    Import all SQL files from the input directory.
    
    Args:
        input_dir: Directory containing SQL files
        connection: MySQL connection object
        batch_size: Number of statements to execute in a batch
        skip_existing: Whether to skip existing data to avoid duplicates
        force_create_tables: Whether to force creation of tables even if they exist
        
    Returns:
        Number of files imported and statements executed
    """
    if not os.path.exists(input_dir):
        logger.error(f"Input directory does not exist: {input_dir}")
        return 0, 0
    
    # First, apply database settings if available
    settings_file = os.path.join(input_dir, "database_settings.sql")
    if os.path.exists(settings_file):
        logger.info("Found database settings file, applying settings...")
        db_name = connection.database
        apply_database_settings(connection, db_name, settings_file)
        
    # Get all SQL files with their sizes
    sql_files = []
    for f in os.listdir(input_dir):
        if f.endswith('.sql') and f != "database_settings.sql":
            file_path = os.path.join(input_dir, f)
            file_size = os.path.getsize(file_path)
            sql_files.append((f, file_path, file_size))
    
    if not sql_files:
        logger.warning(f"No SQL files found in {input_dir}")
        return 0, 0
        
    # Sort files by size (smallest to largest)
    sql_files.sort(key=lambda x: x[2])
    
    logger.info(f"Found {len(sql_files)} SQL files to import")
    logger.info("Files will be imported from smallest to largest size")
    
    # First extract all CREATE TABLE statements
    logger.info("Extracting CREATE TABLE statements from all files...")
    create_table_statements = extract_create_table_statements(input_dir)
    
    # Create all tables first
    logger.info("Creating tables...")
    tables_created = create_tables(connection, create_table_statements, force_create_tables)
    logger.info(f"Created {tables_created} tables")
    
    # Verify all tables exist before proceeding with data import
    missing_tables = []
    cursor = connection.cursor()
    for table_name in create_table_statements.keys():
        if not table_exists(connection, table_name):
            missing_tables.append(table_name)
    
    if missing_tables:
        logger.warning(f"The following tables could not be created: {', '.join(missing_tables)}")
        logger.warning("This may cause errors during data import")
    
    # Import each file for data
    files_imported = 0
    statements_executed = tables_created
    
    # Set foreign key checks to 0 to avoid dependency issues
    cursor.execute("SET FOREIGN_KEY_CHECKS=0")
    
    start_time = time.time()
    
    # Process data statements
    logger.info("Processing data statements...")
    for filename, file_path, file_size in sql_files:
        logger.info(f"Importing {filename} ({file_size} bytes)")
        
        try:
            with open(file_path, 'r', encoding='utf-8', errors='replace') as f:
                sql_content = f.read()
                
            # Extract table name from filename
            table_name = os.path.splitext(filename)[0]
            
            # Skip if table has data and skip_existing is True
            if skip_existing and table_exists(connection, table_name) and table_has_data(connection, table_name):
                logger.info(f"Skipping {table_name} as it already has data and skip_existing is enabled")
                continue
                
            # Skip if table doesn't exist
            if not table_exists(connection, table_name):
                logger.warning(f"Table {table_name} does not exist, skipping file {filename}")
                continue
                
            # Split the content into individual statements
            statements = split_sql_statements(sql_content)
            
            if not statements:
                logger.warning(f"No SQL statements found in {filename}")
                continue
                
            # Execute statements in batches
            batch = []
            
            for stmt in statements:
                # Skip CREATE TABLE statements as they've already been processed
                if re.search(r'^\s*CREATE\s+TABLE', stmt, re.IGNORECASE):
                    continue
                    
                # Process INSERT statements
                if re.search(r'^\s*INSERT\s+INTO', stmt, re.IGNORECASE):
                    # Extract table name from statement
                    stmt_table = extract_table_name(stmt)
                    
                    # Check if the table exists
                    if not stmt_table or not table_exists(connection, stmt_table):
                        if stmt_table:
                            logger.warning(f"Table {stmt_table} does not exist, skipping INSERT statement")
                        else:
                            logger.warning(f"Could not extract table name from statement, skipping: {stmt[:100]}...")
                        continue
                    
                    # If skip_existing is True and table has data, use REPLACE INTO
                    if skip_existing and table_has_data(connection, stmt_table):
                        stmt = modify_insert_to_replace(stmt)
                
                batch.append(stmt)
                
                if len(batch) >= batch_size:
                    # Execute the batch
                    for batch_stmt in batch:
                        try:
                            cursor.execute(batch_stmt)
                            statements_executed += 1
                        except Error as e:
                            logger.error(f"Error executing statement: {e}")
                            logger.error(f"Statement: {batch_stmt[:100]}...")
                    
                    # Commit the batch
                    connection.commit()
                    
                    # Clear the batch
                    batch = []
            
            # Execute any remaining statements
            if batch:
                for batch_stmt in batch:
                    try:
                        cursor.execute(batch_stmt)
                        statements_executed += 1
                    except Error as e:
                        logger.error(f"Error executing statement: {e}")
                        logger.error(f"Statement: {batch_stmt[:100]}...")
                
                connection.commit()
            
            files_imported += 1
            
            elapsed_time = time.time() - start_time
            logger.info(f"Imported {filename} in {elapsed_time:.2f} seconds")
            
        except Exception as e:
            logger.error(f"Error importing {filename}: {e}")
            logger.error(traceback.format_exc())
    
    # Set foreign key checks back to 1
    cursor.execute("SET FOREIGN_KEY_CHECKS=1")
    cursor.close()
    
    total_time = time.time() - start_time
    logger.info(f"Import completed in {total_time:.2f} seconds")
    logger.info(f"Imported {files_imported} files")
    logger.info(f"Executed {statements_executed} statements")
    logger.info(f"Created {tables_created} tables")
    
    return files_imported, statements_executed

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
            args.create_database,
            args.disable_ssl
        )
        
        if not connection:
            logger.error("Failed to connect to MySQL")
            return 1
            
        # Import tables
        files_imported, statements_executed = import_tables(
            args.input_dir, 
            connection, 
            args.batch_size,
            args.skip_existing,
            args.force_create_tables
        )
        
        if files_imported == 0:
            logger.warning("No files were imported")
            
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
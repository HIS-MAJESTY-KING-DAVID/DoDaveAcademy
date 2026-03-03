#!/usr/bin/env python3
"""
Database Settings Extractor and Importer for Windows

This script extracts database settings from a MySQL dump file and applies them to a target database.
It focuses specifically on database-level settings like character sets, collations, and configuration.

Usage:
    python database_settings_extractor_and_importer.py extract <input_file> <output_file>
    python database_settings_extractor_and_importer.py import <settings_file> --host localhost --port 3306 --user root --password "" --database mydb

Examples:
    # Extract settings from a dump file
    python database_settings_extractor_and_importer.py extract C:\\path\\to\\dump.sql C:\\path\\to\\settings.sql
    
    # Apply settings to a database
    python database_settings_extractor_and_importer.py import C:\\path\\to\\settings.sql --database mydb --user root --password mypass
"""

import os
import re
import argparse
import logging
import sys
import traceback
import time
from collections import defaultdict

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
    logger.error("pip install mysql-connector-python")
    sys.exit(1)

def parse_arguments():
    """Parse command line arguments."""
    parser = argparse.ArgumentParser(description='Extract and import database settings from/to MySQL.')
    subparsers = parser.add_subparsers(dest='command', help='Command to execute')
    
    # Extract command
    extract_parser = subparsers.add_parser('extract', help='Extract database settings from a dump file')
    extract_parser.add_argument('input_file', help='Path to the MySQL dump file')
    extract_parser.add_argument('output_file', help='Path to save the extracted settings')
    extract_parser.add_argument('--buffer-size', type=int, default=1024*1024*10,
                              help='Buffer size for reading the file (default: 10MB)')
    
    # Import command
    import_parser = subparsers.add_parser('import', help='Import database settings to a MySQL database')
    import_parser.add_argument('settings_file', help='Path to the settings file to import')
    import_parser.add_argument('--host', default='localhost', 
                             help='MySQL server host (default: localhost)')
    import_parser.add_argument('--port', type=int, default=3306, 
                             help='MySQL server port (default: 3306)')
    import_parser.add_argument('--user', default='root', 
                             help='MySQL username (default: root)')
    import_parser.add_argument('--password', default='', 
                             help='MySQL password (default: empty)')
    import_parser.add_argument('--database', required=True, 
                             help='Target database name')
    import_parser.add_argument('--create-database', action='store_true',
                             help='Create the database if it does not exist')
    import_parser.add_argument('--disable-ssl', action='store_true', default=False,
                             help='Disable SSL for MySQL connection (default: False)')
    
    args = parser.parse_args()
    
    if not args.command:
        parser.print_help()
        sys.exit(1)
        
    return args

def extract_database_settings(input_file, output_file, buffer_size=1024*1024*10):
    """
    Extract database settings from a MySQL dump file.
    
    Args:
        input_file: Path to the MySQL dump file
        output_file: Path to save the extracted settings
        buffer_size: Size of buffer for reading the file
    
    Returns:
        Number of settings extracted
    """
    if not os.path.exists(input_file):
        logger.error(f"Input file does not exist: {input_file}")
        return 0
    
    # List to store database settings
    database_settings = []
    
    # Regular expressions for matching SQL statements
    create_db_pattern = re.compile(r'CREATE\s+DATABASE|ALTER\s+DATABASE|SET\s+|USE\s+', re.IGNORECASE)
    
    # Get the total file size for progress reporting
    total_size = os.path.getsize(input_file)
    file_size_hr = get_file_size(input_file)
    logger.info(f"Processing file: {input_file} ({file_size_hr})")
    
    # State variables
    in_comment = False
    in_statement = False
    current_statement = []
    processed_size = 0
    start_time = time.time()
    settings_found = 0
    
    # Process the file line by line to minimize memory usage
    with open(input_file, 'r', encoding='utf-8', errors='replace') as f:
        for line_num, line in enumerate(f, 1):
            processed_size += len(line)
            
            # Periodic progress reporting
            if line_num % 10000 == 0:
                percent_complete = (processed_size / total_size) * 100
                logger.info(f"Progress: {percent_complete:.2f}% - Processed {line_num:,} lines, {settings_found} settings found")
            
            # Handle multi-line comments
            if '/*' in line and not in_comment:
                in_comment = True
                
            if '*/' in line and in_comment:
                in_comment = False
                
            # Skip comment-only lines
            if in_comment or line.strip().startswith('--'):
                continue
            
            # Check for database settings
            if not in_statement and create_db_pattern.search(line):
                in_statement = True
                current_statement = [line]
                continue
            
            # If we're in a statement, add the line to the current statement
            if in_statement:
                current_statement.append(line)
                
                # Check if the statement is complete
                if line.strip().endswith(';'):
                    in_statement = False
                    database_settings.extend(current_statement)
                    settings_found += 1
                    logger.debug(f"Found database setting: {''.join(current_statement).strip()}")
                    current_statement = []
    
    # Write settings to output file
    if database_settings:
        with open(output_file, 'w', encoding='utf-8') as f:
            f.writelines(database_settings)
        logger.info(f"Extracted {settings_found} database settings to: {output_file}")
    else:
        logger.warning("No database settings found in the input file")
    
    elapsed_time = time.time() - start_time
    logger.info(f"Extraction completed in {elapsed_time:.2f} seconds")
    
    return settings_found

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

def import_database_settings(settings_file, connection, database_name):
    """
    Import database settings from a file to a MySQL database.
    
    Args:
        settings_file: Path to the settings file
        connection: MySQL connection object
        database_name: Name of the database to apply settings to
        
    Returns:
        Number of settings applied
    """
    if not os.path.exists(settings_file):
        logger.error(f"Settings file does not exist: {settings_file}")
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
        logger.error(f"Error importing database settings: {e}")
        logger.error(traceback.format_exc())
    
    return settings_applied

def get_file_size(file_path):
    """
    Get file size in human-readable format.
    
    Args:
        file_path: Path to the file
        
    Returns:
        File size as a string (e.g., '1.2 MB')
    """
    if isinstance(file_path, int):
        size_bytes = file_path
    else:
        size_bytes = os.path.getsize(file_path)
        
    for unit in ['B', 'KB', 'MB', 'GB', 'TB']:
        if size_bytes < 1024.0:
            return f"{size_bytes:.2f} {unit}"
        size_bytes /= 1024.0
    return f"{size_bytes:.2f} PB"

def main():
    """Main function to run the script."""
    args = parse_arguments()
    
    try:
        if args.command == 'extract':
            extract_database_settings(args.input_file, args.output_file, args.buffer_size)
        elif args.command == 'import':
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
                
            # Import settings
            import_database_settings(args.settings_file, connection, args.database)
            
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

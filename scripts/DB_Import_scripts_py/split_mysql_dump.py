#!/usr/bin/env python3
"""
MySQL Dump Splitter

This script splits a large MySQL dump file into separate files for each table.
It preserves the CREATE TABLE statements and corresponding INSERT INTO statements
for each table in their own files.

Usage:
    python3 split_mysql_dump.py <input_file> <output_dir> [--buffer-size <buffer_size>]

    <input_file>: Path to the MySQL dump file
    <output_dir>: Directory to save the split files
    <buffer-size>: Size of buffer for reading the file (default: 1MB)
    <log-level>: Logging level (default: INFO)

Example:
    python3 split_mysql_dump.py /backup/kulma2146700_20250408_020001.sql ~/output_tables
    python3 split_mysql_dump.py /backup/kulma2146700_20250408_020001.sql ~/output_tables --log-level ERROR
"""

import os
import re
import argparse
import time
from collections import defaultdict
import logging
import sys

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def parse_arguments():
    """Parse command line arguments."""
    parser = argparse.ArgumentParser(description='Split MySQL dump file into separate files per table.')
    parser.add_argument('input_file', help='Path to the MySQL dump file', default='/backup/kulma2146700_20250408_020001.sql', nargs='?')
    parser.add_argument('output_dir', help='Directory to save the split files', default=os.path.expanduser('~/output_tables'), nargs='?')
    parser.add_argument('--buffer-size', type=int, default=1024*1024*10,  # Increased to 10MB 
                        help='Buffer size for reading the file (default: 10MB)')
    parser.add_argument('--log-level', default='INFO', choices=['DEBUG', 'INFO', 'WARNING', 'ERROR', 'CRITICAL'],
                        help='Set the logging level (default: INFO)')
    parser.add_argument('--chunk-size', type=int, default=1000,
                        help='Number of lines to process before reporting progress (default: 1000)')
    return parser.parse_args()

def ensure_output_directory(directory):
    """Ensure the output directory exists."""
    if not os.path.exists(directory):
        os.makedirs(directory)
        logger.info(f"Created output directory: {directory}")

def sanitize_filename(table_name):
    """Sanitize table name for use as a filename."""
    # Replace any characters that might be problematic in filenames
    sanitized = re.sub(r'[^\w\-\.]', '_', table_name)
    return sanitized

def get_file_size(file_path):
    """Get file size in human-readable format."""
    size_bytes = os.path.getsize(file_path)
    for unit in ['B', 'KB', 'MB', 'GB', 'TB']:
        if size_bytes < 1024.0 or unit == 'TB':
            break
        size_bytes /= 1024.0
    return f"{size_bytes:.2f} {unit}"

def process_dump_file(input_file, output_dir, buffer_size=1024*1024*10, chunk_size=1000):
    """
    Process the MySQL dump file and split it into separate files per table.
    
    Args:
        input_file: Path to the MySQL dump file
        output_dir: Directory to save the split files
        buffer_size: Size of buffer for reading the file
        chunk_size: Number of lines to process before reporting progress
    """
    # Dictionary to store content for each table
    table_content = defaultdict(list)
    
    # List to store database settings
    database_settings = []
    
    # Regular expressions for matching SQL statements
    create_table_pattern = re.compile(r'CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(?:`?([^`(]+)`?|"([^"(]+)"|([a-zA-Z0-9_]+))', re.IGNORECASE)
    insert_pattern = re.compile(r'INSERT\s+INTO\s+(?:`?([^`(]+)`?|"([^"(]+)"|([a-zA-Z0-9_]+))', re.IGNORECASE)
    create_db_pattern = re.compile(r'CREATE\s+DATABASE|ALTER\s+DATABASE|SET\s+', re.IGNORECASE)
    
    # Get the total file size for progress reporting
    total_size = os.path.getsize(input_file)
    file_size_hr = get_file_size(input_file)
    logger.info(f"Processing file: {input_file} ({file_size_hr})")
    
    # State variables
    current_table = None
    in_comment = False
    in_statement = False
    current_statement = []
    statement_type = None
    line_count = 0
    processed_size = 0
    start_time = time.time()
    tables_found = set()
    
    # Process the file line by line to minimize memory usage
    with open(input_file, 'r', encoding='utf-8', errors='replace') as f:
        for line_num, line in enumerate(f, 1):
            processed_size += len(line)
            line_count += 1
            
            # Periodic progress reporting
            if line_count % chunk_size == 0:
                percent_complete = (processed_size / total_size) * 100
                elapsed_time = time.time() - start_time
                estimated_total_time = (elapsed_time / percent_complete) * 100 if percent_complete > 0 else 0
                estimated_remaining_time = estimated_total_time - elapsed_time
                
                logger.info(f"Progress: {percent_complete:.2f}% - Processed {line_count:,} lines, {len(tables_found)} tables found - ETA: {estimated_remaining_time/60:.1f} minutes")
            
            # Handle multi-line comments
            if '/*' in line and not in_comment:
                in_comment = True
                
            if '*/' in line and in_comment:
                in_comment = False
                
            # Skip comment-only lines
            if in_comment or line.strip().startswith('--'):
                # Still add comments to the current table if we're tracking one
                if current_table:
                    table_content[current_table].append(line)
                continue
            
            # Check for database settings (CREATE DATABASE, ALTER DATABASE, SET)
            if not in_statement and create_db_pattern.search(line):
                in_statement = True
                statement_type = 'DB_SETTING'
                current_statement = [line]
                continue
                
            # Check for CREATE TABLE statements
            if not in_statement:
                create_match = create_table_pattern.search(line)
                if create_match:
                    # Get the first non-None group
                    current_table = next((g for g in create_match.groups() if g is not None), None)
                    if current_table:
                        if current_table not in tables_found:
                            tables_found.add(current_table)
                            logger.debug(f"Found new table: {current_table}")
                        
                        in_statement = True
                        statement_type = 'CREATE'
                        current_statement = [line]
                        continue
            
            # Check for INSERT INTO statements
            if not in_statement:
                insert_match = insert_pattern.search(line)
                if insert_match:
                    # Get the first non-None group
                    table_name = next((g for g in insert_match.groups() if g is not None), None)
                    if table_name:
                        current_table = table_name
                        if current_table not in tables_found:
                            tables_found.add(current_table)
                            logger.debug(f"Found table in INSERT: {current_table}")
                        
                        in_statement = True
                        statement_type = 'INSERT'
                        current_statement = [line]
                        continue
            
            # If we're in a statement, add the line to the current statement
            if in_statement:
                current_statement.append(line)
                
                # Check if the statement is complete
                if line.strip().endswith(';'):
                    in_statement = False
                    if statement_type == 'DB_SETTING':
                        database_settings.extend(current_statement)
                        logger.debug(f"Found database setting: {''.join(current_statement).strip()}")
                    elif current_table:
                        table_content[current_table].extend(current_statement)
                    current_statement = []
            else:
                # Add any other lines (like comments or SET statements) to the current table if we have one
                if current_table:
                    table_content[current_table].append(line)
    
    # Write each table's content to a separate file
    tables_written = 0
    total_size_written = 0
    
    logger.info(f"Writing {len(table_content)} tables to output directory")
    
    for table, content in table_content.items():
        safe_table_name = sanitize_filename(table)
        output_file = os.path.join(output_dir, f"{safe_table_name}.sql")
        
        with open(output_file, 'w', encoding='utf-8') as f:
            f.writelines(content)
        
        file_size = os.path.getsize(output_file)
        total_size_written += file_size
        tables_written += 1
        
        # Only log at debug level to reduce output
        logger.debug(f"Created file: {output_file} ({get_file_size(output_file)})")
        
        # Show periodic updates for large numbers of tables
        if tables_written % 10 == 0:
            logger.info(f"Wrote {tables_written}/{len(table_content)} tables...")
    
    # Write database settings to a separate file
    if database_settings:
        settings_file = os.path.join(output_dir, "database_settings.sql")
        with open(settings_file, 'w', encoding='utf-8') as f:
            f.writelines(database_settings)
        logger.info(f"Created database settings file: {settings_file}")
    
    # Summary
    logger.info(f"Split complete: {tables_written} tables written to {output_dir}")
    logger.info(f"Total input size: {file_size_hr}")
    logger.info(f"Total output size: {get_file_size(total_size_written)}")
    logger.info(f"Processing completed in {time.time() - start_time:.2f} seconds")

def main():
    """Main function to run the script."""
    args = parse_arguments()
    
    # Set logging level from argument
    log_level = getattr(logging, args.log_level.upper())
    logger.setLevel(log_level)
    for handler in logger.handlers:
        handler.setLevel(log_level)
    
    ensure_output_directory(args.output_dir)
    
    try:
        process_dump_file(args.input_file, args.output_dir, args.buffer_size, args.chunk_size)
        logger.info("MySQL dump file splitting completed successfully.")
    except Exception as e:
        logger.error(f"An error occurred: {str(e)}")
        import traceback
        logger.error(traceback.format_exc())
        return 1
    
    return 0

if __name__ == "__main__":
    exit(main())
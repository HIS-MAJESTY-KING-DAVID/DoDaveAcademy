# Database Import Scripts for Ubuntu Server

These scripts are designed to split a MySQL database dump file into separate table files and import them into a MySQL database on an Ubuntu server.

## Prerequisites

1. Python 3.6 or higher
2. MySQL server installed on your Ubuntu server
3. Python MySQL connector package

Install the required Python package:

```bash
# For Debian/Ubuntu systems (recommended method)
sudo apt-get update
sudo apt-get install -y python3-mysql.connector

# Alternative: If using a virtual environment
# 1. Install required packages
sudo apt-get update
sudo apt-get install -y python3-venv python3-full

# 2. Create and activate a virtual environment
python3 -m venv ~/mysql_venv
source ~/mysql_venv/bin/activate

# 3. Install the package in the virtual environment
pip install mysql-connector-python

# 4. When running scripts with the virtual environment, use:
# ~/mysql_venv/bin/python3 script_name.py [arguments]
```

## Scripts Overview

1. **split_mysql_dump.py**: Splits a large MySQL dump file into separate files for each table.
2. **import_tables.py**: Imports the split SQL files into a MySQL database.
3. **Append_data.py**: Appends data from SQL files to existing tables, avoiding duplicates.

## Usage Instructions

### 1. Copy Scripts to Ubuntu Server

Copy these scripts to your Ubuntu server using SCP, SFTP, or any other file transfer method.

```bash
# Example using SCP (run from your local machine)
scp -P 1024 script/DB_Import_scripts_py/*.py username@your-server-ip:~/scripts/
```

### 2. Make Scripts Executable

```bash
chmod +x ~/scripts/*.py
```

### 3. Split the MySQL Dump File

```bash
cd ~/scripts
python3 split_mysql_dump.py /backup/kulma2146700_20250408_020001.sql ~/output_tables
```

This will:
- Read the dump file from `/backup/kulma2146700_20250408_020001.sql`
- Create a directory at `~/output_tables` if it doesn't exist
- Split the dump file into separate files for each table in the `~/output_tables` directory
- Extract database settings (CREATE DATABASE, ALTER DATABASE, SET statements) into a `database_settings.sql` file

### 4. Import Tables (Create Schema)

```bash
# If you encounter SSL errors, use the --disable-ssl flag
python3 import_tables.py --database=kulmatest --user=kulma2146700 --password=tN9-RX3sFHV9yKf --disable-ssl
```

This will:
- Connect to the MySQL server on localhost
- Create the database if it doesn't exist (use --create-database flag)
- Apply database settings from the `database_settings.sql` file if it exists
- Import all table structures and data from the `~/output_tables` directory
- Disable SSL if specified (helps resolve SSL-related errors)

For tables with dependency issues, you can use the `--force-create-tables` flag to drop and recreate all tables:

```bash
python3 import_tables.py --database=kulmatest --user=kulma2146700 --password=tN9-RX3sFHV9yKf --disable-ssl --force-create-tables
```

### 5. Append Data (Optional)

If you need to append data to existing tables:

```bash
# If you encounter SSL errors, use the --disable-ssl flag
python3 Append_data.py --database=kulmatest --user=kulma2146700 --password=tN9-RX3sFHV9yKf --disable-ssl
```

This will:
- Connect to the MySQL database
- Check each table for existing data
- Append only new data to avoid duplicates

You can also specify which tables to process:

```bash
# Only process specific tables
python3 Append_data.py --database=kulmatest --only-tables table1 table2 table3 --disable-ssl

# Skip specific tables
python3 Append_data.py --database=kulmatest --skip-tables table1 table2 --disable-ssl
```

## Additional Options

All scripts support various command-line options:

- `--host`: MySQL server host (default: localhost)
- `--port`: MySQL server port (default: 3306)
- `--user`: MySQL username (default: root)
- `--password`: MySQL password (default: empty)
- `--database`: Target database name (default: kulmatest)
- `--batch-size`: Number of statements to execute in a batch (default: 1000)
- `--disable-ssl`: Disable SSL for MySQL connection (helps with SSL errors)

The import_tables.py script also supports:
- `--force-create-tables`: Force creation of all tables even if they exist (default: False)
- `--skip-existing`: Skip existing data to avoid duplicates (default: True)

The Append_data.py script also supports:
- `--skip-tables`: List of tables to skip during import
- `--only-tables`: Only import these tables (if specified)

## Complete Example Workflow

```bash
# 0. Install required packages
sudo apt-get update
sudo apt-get install -y python3-mysql.connector

# 1. Split the dump file
python3 split_mysql_dump.py /backup/kulma2146700_20250408_020001.sql ~/output_tables

# 2. Create database and import tables
python3 import_tables.py --database=kulmatest --user=kulma2146700 --password=tN9-RX3sFHV9yKf --create-database --disable-ssl

# 3. Append data (if needed)
python3 Append_data.py --database=kulmatest --user=kulma2146700 --password=tN9-RX3sFHV9yKf --disable-ssl
```

## Database Settings

The scripts now support preserving and applying database-level settings from the original dump file:

1. **Extraction**: When running `split_mysql_dump.py`, the script extracts database-level settings (CREATE DATABASE, ALTER DATABASE, SET statements) into a separate file called `database_settings.sql`.

2. **Application**: When running `import_tables.py`, the script checks for the existence of `database_settings.sql` and applies those settings to the target database.

3. **What's Preserved**: The following database settings are preserved:
   - Character set and collation settings
   - Database-level configuration parameters
   - Time zone settings
   - Other SET statements from the original dump

4. **Automatic Adaptation**: The script automatically adapts the settings to the new database name if it differs from the original.

This ensures that your imported database maintains the same settings and behavior as the original database.

## Troubleshooting

### Common Issues and Solutions

#### Module Not Found Errors
- If you encounter the error `ModuleNotFoundError: No module named 'mysql'`, install the package using `sudo apt-get install -y python3-mysql.connector`
- If you're using a system with externally managed Python packages (like newer Debian/Ubuntu), you should use apt instead of pip to install packages
- If you need to use pip, create a virtual environment first as described in the Prerequisites section

#### SSL Errors
- If you encounter SSL errors like `module 'ssl' has no attribute 'wrap_socket'`, use the `--disable-ssl` flag when running the scripts

#### Table Creation Issues
- If tables are not being created properly, try using the `--force-create-tables` flag
- The script now automatically adds `IF NOT EXISTS` to CREATE TABLE statements to prevent errors
- Tables are now created in alphabetical order, which helps with some dependency issues (though not all)

#### Missing Table Errors
- If you see errors about missing tables during data import, check the log for warnings about tables that could not be created
- Try running the import_tables.py script with the `--force-create-tables` flag
- Ensure that all required tables are included in your SQL dump file

#### Database Settings Issues
- If database settings are not being applied correctly, check the `database_settings.sql` file to ensure it contains the expected settings
- Some settings might require specific privileges to apply; ensure your MySQL user has the necessary permissions

#### Encoding Issues
- The scripts are set to handle encoding issues with the `errors='replace'` parameter
- If you still encounter encoding problems, check the character set of your MySQL server and database

#### Performance Considerations
- For large tables, you may need to increase the batch size to improve performance
- You can use the `--batch-size` parameter to control how many statements are executed in a batch

### Debugging

The scripts include detailed logging to help diagnose issues:
- Check the console output for error messages
- Look for warnings about missing tables or failed statements
- The logs will show which tables were created successfully and which ones failed
- For data import errors, the logs will show which statements failed and why

If you need more detailed debugging information, you can modify the logging level in the scripts:
```python
# Change this line in the scripts
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

#!/usr/bin/env python
"""
Database Dump Downloader

This script connects to a remote server via SSH and downloads a MySQL dump file.
It reads connection details from ssh_config.ini and shows download progress.
It supports resuming interrupted downloads.

Usage:
    python Download_DB_Dump.py [remote_path] [local_path]
    
    If no arguments are provided, it will use the default paths in the script.
    
Requirements:
    - paramiko
    - tqdm
    
Install dependencies:
    pip install paramiko tqdm

Example usage:
    python Download_DB_Dump.py
"""

import paramiko
import os
import sys
import time
import configparser
from pathlib import Path
from tqdm import tqdm
import datetime

def load_config():
    """Load SSH configuration from ssh_config.ini file"""
    config = configparser.ConfigParser()
    config_path = Path(__file__).parent / 'ssh_config.ini'
    if not config_path.exists():
        raise FileNotFoundError("Configuration file ssh_config.ini not found")
    config.read(config_path)
    return config['ssh']

def progress_callback(current, total):
    """Update the progress bar"""
    if not hasattr(progress_callback, 'pbar'):
        progress_callback.pbar = tqdm(total=total, unit='B', unit_scale=True, 
                                     desc="Downloading", ncols=100)
    progress_callback.pbar.update(current - progress_callback.pbar.n)
    if current >= total:
        progress_callback.pbar.close()

def download_with_resume(sftp, remote_path, local_path, max_attempts=3):
    """Download file with resume capability"""
    file_stat = sftp.stat(remote_path)
    total_size = file_stat.st_size
    
    # Check if local file exists and is partially downloaded
    local_size = 0
    if os.path.exists(local_path):
        local_size = os.path.getsize(local_path)
        
        if local_size == total_size:
            print(f"\nFile already completely downloaded: {local_path}")
            print(f"Size: {total_size / (1024*1024):.2f} MB")
            return True, 0, 0  # Already downloaded
            
        elif local_size < total_size:
            print(f"\nResuming download from {local_size / (1024*1024):.2f} MB")
        else:
            # Local file is larger than remote (corrupted)
            print(f"\nLocal file is larger than remote file. Restarting download.")
            local_size = 0
    
    # Set up progress bar for the remaining portion
    remaining = total_size - local_size
    pbar = tqdm(total=total_size, initial=local_size, unit='B', unit_scale=True, 
                desc="Downloading", ncols=100)
    
    # Attempt download with retries
    attempt = 0
    start_time = time.time()
    
    while attempt < max_attempts:
        try:
            # Open local file in append mode if resuming
            with open(local_path, 'ab' if local_size > 0 else 'wb') as f:
                # Create a custom callback to update our progress bar
                def custom_callback(bytes_transferred, _):
                    nonlocal local_size
                    local_size += bytes_transferred
                    pbar.update(bytes_transferred)
                
                # For resuming, we need to seek to the right position in the remote file
                if local_size > 0:
                    # Create a temporary file handle to the remote file
                    with sftp.open(remote_path, 'rb') as remote_file:
                        # Seek to the position where we left off
                        remote_file.seek(local_size)
                        
                        # Read and write in chunks
                        chunk_size = 1024 * 1024  # 1MB chunks
                        bytes_read = 0
                        
                        while bytes_read < (total_size - local_size):
                            # Read a chunk from remote file
                            chunk = remote_file.read(chunk_size)
                            if not chunk:
                                break  # End of file
                                
                            # Write chunk to local file
                            f.write(chunk)
                            
                            # Update progress
                            bytes_read += len(chunk)
                            custom_callback(len(chunk), 0)
                else:
                    # If starting from beginning, use get method
                    sftp.get(remote_path, local_path, callback=custom_callback)
                
                # If we get here, download completed successfully
                pbar.close()
                elapsed_time = time.time() - start_time
                return True, elapsed_time, total_size
                
        except Exception as e:
            attempt += 1
            print(f"\nDownload interrupted: {str(e)}")
            if attempt < max_attempts:
                wait_time = 5 * attempt
                print(f"Retrying in {wait_time} seconds... (Attempt {attempt+1}/{max_attempts})")
                time.sleep(wait_time)
                # Get current size of local file for resuming
                if os.path.exists(local_path):
                    local_size = os.path.getsize(local_path)
            else:
                print(f"Maximum retry attempts reached. Download incomplete.")
                pbar.close()
                return False, time.time() - start_time, local_size
    
    return False, 0, 0

def list_remote_dumps(sftp, remote_dir):
    """List SQL dump files in the remote directory"""
    try:
        files = sftp.listdir(remote_dir)
        sql_files = [f for f in files if f.endswith('.sql')]
        
        if sql_files:
            print(f"\nFound {len(sql_files)} SQL dump files in {remote_dir}:")
            for i, f in enumerate(sql_files, 1):
                try:
                    file_stat = sftp.stat(f"{remote_dir}/{f}")
                    size_mb = file_stat.st_size / (1024*1024)
                    print(f"  {i}. {f} ({size_mb:.2f} MB)")
                except:
                    print(f"  {i}. {f}")
            return sql_files
        else:
            print(f"No SQL dump files found in {remote_dir}")
            return []
    except Exception as e:
        print(f"Could not list directory {remote_dir}: {str(e)}")
        print("You may not have permission to access this directory.")
        return []

def select_dump_file(sftp, remote_dir):
    """Allow user to select a dump file from the remote directory"""
    sql_files = list_remote_dumps(sftp, remote_dir)
    
    if not sql_files:
        return None
        
    while True:
        try:
            choice = input("\nEnter the number of the file to download (or 'q' to quit): ")
            if choice.lower() == 'q':
                return None
                
            choice = int(choice)
            if 1 <= choice <= len(sql_files):
                return f"{remote_dir}/{sql_files[choice-1]}"
            else:
                print(f"Please enter a number between 1 and {len(sql_files)}")
        except ValueError:
            print("Please enter a valid number")

def main():
    print("=" * 60)
    print("MySQL Dump Downloader".center(60))
    print("=" * 60)
    
    try:
        # Load configuration
        config = load_config()
        hostname = config['hostname']
        port = int(config.get('port', '22'))
        username = config['username']
        password = config['password']
        
        # Get file paths from command line arguments or use defaults
        if len(sys.argv) > 2:
            remote_path = sys.argv[1]
            local_path = sys.argv[2]
        else:
            # Default remote directory to look for SQL dumps
            remote_dir = '/backup'
            
            # Default local path in Downloads folder with timestamp
            timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
            local_path = os.path.expanduser(f"~\\Downloads\\mysql_dump_{timestamp}.sql")
            
            print(f"Using default local path: {local_path}")
            print(f"Will search for SQL dumps in: {remote_dir}")
        
        # Create local directory if it doesn't exist
        local_dir = os.path.dirname(local_path)
        if not os.path.exists(local_dir):
            os.makedirs(local_dir)
            print(f"Created directory: {local_dir}")
        
        # Set connection timeout and keepalive
        connect_kwargs = {
            'hostname': hostname,
            'port': port,
            'username': username,
            'password': password,
            'timeout': 60,  # 60 second timeout
            'banner_timeout': 120,  # Increased from 60
            'auth_timeout': 120,  # Increased from 60
            'look_for_keys': False,
            'allow_agent': False
        }
        
        # Create SSH client with keepalive
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        
        # Connect to server
        print(f"\nConnecting to {hostname}:{port} as {username}...")
        print("This may take a minute, please wait...")
        ssh.connect(**connect_kwargs)
        
        # Enable keepalive packets
        transport = ssh.get_transport()
        transport.set_keepalive(60)  # Send keepalive every 60 seconds
        
        print("Connection established successfully.")
        
        # Create SFTP client
        sftp = ssh.open_sftp()
        
        # If remote_path is not specified, let user select from available dumps
        if 'remote_path' not in locals():
            remote_path = select_dump_file(sftp, remote_dir)
            if not remote_path:
                print("No file selected. Exiting.")
                return
                
            # Update local path with the selected filename
            filename = os.path.basename(remote_path)
            local_path = os.path.expanduser(f"~\\Downloads\\{filename}")
            print(f"Will download to: {local_path}")
        
        # Check if file exists
        try:
            file_stat = sftp.stat(remote_path)
            file_size = file_stat.st_size
            print(f"\nFile found: {remote_path}")
            print(f"Size: {file_size / (1024*1024):.2f} MB")
            
            # Download file with resume capability
            success, elapsed_time, downloaded_size = download_with_resume(sftp, remote_path, local_path)
            
            if success:
                # Calculate download speed
                speed = downloaded_size / (elapsed_time * 1024 * 1024) if elapsed_time > 0 else 0
                
                print(f"\nDownload complete!")
                print(f"  Source: {remote_path}")
                print(f"  Destination: {local_path}")
                print(f"  Size: {downloaded_size / (1024*1024):.2f} MB")
                print(f"  Time: {elapsed_time:.2f} seconds")
                print(f"  Speed: {speed:.2f} MB/s")
                
                print("\nNext steps:")
                print(f"1. Split the dump file using:")
                print(f"   python split_mysql_dump.py \"{local_path}\" \"C:\\path\\to\\output_dir\"")
                print(f"2. Apply database settings:")
                print(f"   python database_settings_extractor_and_importer.py extract \"{local_path}\" \"C:\\path\\to\\settings.sql\"")
                print(f"   python database_settings_extractor_and_importer.py import \"C:\\path\\to\\settings.sql\" --database your_db_name")
            else:
                print(f"\nDownload incomplete. You can run the script again to resume.")
            
        except FileNotFoundError:
            print(f"\nERROR: File {remote_path} not found on server.")
            
            # List files in backup directory
            print("\nListing files in directory:")
            remote_dir = os.path.dirname(remote_path)
            try:
                files = sftp.listdir(remote_dir)
                if files:
                    print(f"Files in {remote_dir}:")
                    for i, f in enumerate(files, 1):
                        try:
                            file_stat = sftp.stat(f"{remote_dir}/{f}")
                            size_mb = file_stat.st_size / (1024*1024)
                            print(f"  {i}. {f} ({size_mb:.2f} MB)")
                        except:
                            print(f"  {i}. {f}")
                else:
                    print(f"No files found in {remote_dir}")
            except Exception as e:
                print(f"Could not list directory {remote_dir}: {str(e)}")
                print("You may not have permission to access this directory.")
        
        sftp.close()
        
    except KeyboardInterrupt:
        print("\nOperation cancelled by user.")
    except paramiko.AuthenticationException:
        print("\nERROR: Authentication failed. Please check your username and password.")
    except paramiko.SSHException as e:
        print(f"\nERROR: SSH connection failed: {str(e)}")
    except Exception as e:
        print(f"\nERROR: {str(e)}")
    finally:
        try:
            if 'ssh' in locals():
                ssh.close()
                print("\nSSH connection closed.")
        except:
            pass
        print("\nExiting program.")

if __name__ == "__main__":
    main()

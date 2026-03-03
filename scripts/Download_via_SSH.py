#!/usr/bin/env python
"""
SSH File Downloader

This script connects to a remote server via SSH and downloads files using SFTP.
It reads connection details from ssh_config.ini and shows download progress.
It supports resuming interrupted downloads.

Usage:
    python Download_via_SSH.py [remote_path] [local_path]
    
    If no arguments are provided, it will use the default paths in the script.
    
Requirements:
    - paramiko
    - tqdm
    
Install dependencies:
    pip install paramiko tqdm

Example usage:
    c:/xampp/htdocs/kulmapeck/.venv/Scripts/python.exe c:/xampp/htdocs/kulmapeck/scripts/Download_via_SSH.py
"""

import paramiko
import os
import sys
import time
import configparser
from pathlib import Path
from tqdm import tqdm

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

def main():
    print("=" * 60)
    print("SSH File Downloader".center(60))
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
            remote_path = '/backup/uploads_20250403.tar.gz'
            local_path = os.path.expanduser(r'~\Downloads\uploads_20250403.tar.gz')
            print(f"Using default paths:")
            print(f"  Remote: {remote_path}")
            print(f"  Local:  {local_path}")
        
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
            'timeout': 30,  # 30 second timeout
            'banner_timeout': 60,
            'auth_timeout': 60,
            'look_for_keys': False,
            'allow_agent': False
        }
        
        # Create SSH client with keepalive
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        
        # Connect to server
        print(f"\nConnecting to {hostname}:{port} as {username}...")
        ssh.connect(**connect_kwargs)
        
        # Enable keepalive packets
        transport = ssh.get_transport()
        transport.set_keepalive(60)  # Send keepalive every 60 seconds
        
        print("Connection established successfully.")
        
        # Create SFTP client
        sftp = ssh.open_sftp()
        
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
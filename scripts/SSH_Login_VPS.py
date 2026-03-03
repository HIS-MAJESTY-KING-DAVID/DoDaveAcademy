import paramiko
import time
import sys
import select
import msvcrt
import os
import configparser
from getpass import getpass

def read_config():
    """Read SSH configuration from .ini file"""
    config = configparser.ConfigParser()
    config_path = os.path.join(os.path.dirname(__file__), 'ssh_config.ini')
    
    try:
        config.read(config_path)
        if 'ssh' not in config:
            raise ValueError("SSH section not found in config file")
            
        return {
            'hostname': config['ssh']['hostname'],
            'username': config['ssh']['username'],
            'password': config['ssh']['password'],
            'port': int(config['ssh'].get('port', '22'))
        }
    except Exception as e:
        print(f"[ERROR] Failed to read config file: {str(e)}")
        return None

def create_ssh_connection():
    print("Starting SSH connection process...")
    
    # Read SSH connection details from config
    config = read_config()
    if not config:
        return None
    
    print(f"Attempting to connect to {config['hostname']} as {config['username']}...")
    
    # Initialize SSH client
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    
    try:
        # Connect to the remote server
        print("Establishing connection...")
        ssh.connect(hostname=config['hostname'], 
                   username=config['username'], 
                   password=config['password'],
                   port=config['port'],
                   look_for_keys=False,
                   allow_agent=False)
        
        print(f"[SUCCESS] Successfully connected to {config['hostname']}")
        return ssh
        
    except paramiko.AuthenticationException:
        print("[ERROR] Authentication failed. Please check your username and password.")
        return None
    except paramiko.SSHException as ssh_exception:
        print(f"[ERROR] SSH exception occurred: {ssh_exception}")
        return None
    except Exception as e:
        print(f"[ERROR] Connection failed: {str(e)}")
        return None

def handle_special_keys():
    """Handle special key sequences like arrow keys"""
    first_char = msvcrt.getch()
    if first_char == b'\xe0':  # Special key prefix
        second_char = msvcrt.getch()
        # Map arrow keys to their ANSI escape sequences
        mapping = {
            b'H': b'\x1b[A',  # Up arrow
            b'P': b'\x1b[B',  # Down arrow
            b'K': b'\x1b[D',  # Left arrow
            b'M': b'\x1b[C',  # Right arrow
        }
        return mapping.get(second_char, first_char + second_char)
    return first_char

def interactive_shell(ssh):
    if not ssh:
        return

    # Get an interactive shell
    channel = ssh.invoke_shell(term='xterm')
    channel.settimeout(0.0)
    
    print("\n=== Interactive SSH Session Started ===")
    print("Press 'Ctrl+C' to exit the session\n")
    
    try:
        while True:
            # Check if there's data from the SSH channel
            if channel.recv_ready():
                output = channel.recv(1024)
                if len(output) == 0:
                    break
                sys.stdout.buffer.write(output)
                sys.stdout.buffer.flush()
            
            # Check if there's input from the user
            if msvcrt.kbhit():
                input_char = handle_special_keys()
                
                # Check for Ctrl+C
                if input_char == b'\x03':
                    raise KeyboardInterrupt
                
                # Send the input to the channel
                channel.send(input_char)
            
            # Small sleep to prevent CPU overuse
            time.sleep(0.01)

    except KeyboardInterrupt:
        print("\nSession terminated by user")
    finally:
        channel.close()

if __name__ == "__main__":
    print("\n=== SSH Auto-Login Script ===\n")
    ssh = create_ssh_connection()
    if ssh:
        try:
            interactive_shell(ssh)
        finally:
            print("\nClosing connection...")
            ssh.close()
            print("Connection closed. Goodbye!")
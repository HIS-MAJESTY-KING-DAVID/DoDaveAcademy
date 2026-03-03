import paramiko
import sys
import time
import threading
import msvcrt
import os
import signal
import struct
import configparser
from pathlib import Path

def get_terminal_size():
    try:
        from ctypes import windll, create_string_buffer
        h = windll.kernel32.GetStdHandle(-11)
        csbi = create_string_buffer(22)
        res = windll.kernel32.GetConsoleScreenBufferInfo(h, csbi)
        if res:
            (bufx, bufy, curx, cury, wattr,
             left, top, right, bottom, maxx, maxy) = struct.unpack("hhhhHhhhhhh", csbi.raw)
            sizex = right - left + 1
            sizey = bottom - top + 1
            return sizex, sizey
    except:
        return 80, 24
    return 80, 24

def read_channel(channel):
    while True:
        try:
            if channel.recv_ready():
                data = channel.recv(1024)
                if not data:
                    break
                sys.stdout.buffer.write(data)
                sys.stdout.buffer.flush()
            time.sleep(0.01)
        except Exception:
            break

def handle_window_resize(channel):
    def sigwinch_handler(sig, data):
        width, height = get_terminal_size()
        try:
            channel.resize_pty(width=width, height=height)
        except:
            pass

    signal.signal(signal.SIGWINCH, sigwinch_handler)
    width, height = get_terminal_size()
    channel.resize_pty(width=width, height=height)

def load_config():
    config = configparser.ConfigParser()
    config_path = Path(__file__).parent / 'ssh_config.ini'
    if not config_path.exists():
        raise FileNotFoundError("Configuration file ssh_config.ini not found")
    config.read(config_path)
    return config['ssh']

def main():
    try:
        # Load configuration
        config = load_config()
        hostname = config['hostname']
        port = int(config.get('port', '22'))
        username = config['username']
        password = config['password']

        try:
            # Initialize SSH client
            ssh = paramiko.SSHClient()
            ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
            
            # Connect to the remote server
            print(f"Connecting to {hostname}...")
            ssh.connect(hostname, port, username, password)
            print("Connected successfully!")

            # Get terminal size
            width, height = get_terminal_size()

            # Create an interactive shell with proper terminal settings
            channel = ssh.invoke_shell(
                term='xterm-256color',
                width=width,
                height=height
            )
            
            # Set up window resize handling
            handle_window_resize(channel)
            
            # Start output reading thread
            reader_thread = threading.Thread(target=read_channel, args=(channel,))
            reader_thread.daemon = True
            reader_thread.start()

            # Handle input including special keys
            while True:
                try:
                    if msvcrt.kbhit():
                        char = msvcrt.getch()
                        
                        # Handle Ctrl+C
                        if char == b'\x03':
                            raise KeyboardInterrupt
                        
                        # Handle arrow keys and special combinations
                        if char == b'\xe0':  # Special key prefix
                            char2 = msvcrt.getch()
                            if char2 == b'H':  # Up arrow
                                channel.send('\x1b[A')
                            elif char2 == b'P':  # Down arrow
                                channel.send('\x1b[B')
                            elif char2 == b'M':  # Right arrow
                                channel.send('\x1b[C')
                            elif char2 == b'K':  # Left arrow
                                channel.send('\x1b[D')
                            continue
                        
                        # Handle backspace
                        if char == b'\x08':
                            channel.send('\x7f')
                            continue
                        
                        # Handle tab
                        if char == b'\t':
                            channel.send('\t')
                            continue
                        
                        # Send regular characters
                        channel.send(char)
                        
                    time.sleep(0.01)
                    
                except KeyboardInterrupt:
                    print("\nExiting...")
                    break
                except Exception as e:
                    if "Socket is closed" not in str(e):
                        print(f"\nError: {e}")
                    break

        except Exception as e:
            print(f"Error: {e}")
        finally:
            try:
                ssh.close()
                print("SSH connection closed.")
            except:
                pass

    except KeyboardInterrupt:
        print("\nExiting...")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    # Set up console for binary output
    if sys.platform == 'win32':
        import msvcrt
        import os
        os.system('')  # Enable VT100 escape sequences
    main()
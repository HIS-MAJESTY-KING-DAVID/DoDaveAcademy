#!/bin/bash

# Exit on any error
set -e

echo "Starting file converter setup..."

# Update package list
sudo apt-get update

# Install ImageMagick for image conversion
echo "Installing ImageMagick..."
sudo apt-get install -y imagemagick

# Install unoconv for document conversion
echo "Installing unoconv..."
sudo apt-get install -y unoconv

# Create temp directory with proper permissions
echo "Setting up directories..."
sudo mkdir -p /var/www/kulmapeck/var/temp
sudo chown -R www-data:www-data /var/www/kulmapeck/var/temp
sudo chmod 755 /var/www/kulmapeck/var/temp

# Configure ImageMagick policy to allow PDF conversion
echo "Configuring ImageMagick policy..."
if [ -f "/etc/ImageMagick-6/policy.xml" ]; then
    sudo sed -i 's/rights="none" pattern="PDF"/rights="read|write" pattern="PDF"/' /etc/ImageMagick-6/policy.xml
elif [ -f "/etc/ImageMagick/policy.xml" ]; then
    sudo sed -i 's/rights="none" pattern="PDF"/rights="read|write" pattern="PDF"/' /etc/ImageMagick/policy.xml
else
    echo "Warning: ImageMagick policy file not found in expected locations"
fi

# Create unoconv listener service
echo "Setting up unoconv listener service..."
cat << EOF | sudo tee /etc/systemd/system/unoconv-listener.service
[Unit]
Description=unoconv listener for document conversion
After=network.target

[Service]
ExecStart=/usr/bin/unoconv --listener
User=www-data
Group=www-data
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

# Enable and start the unoconv listener service
echo "Starting unoconv listener service..."
sudo systemctl daemon-reload
sudo systemctl enable unoconv-listener
sudo systemctl start unoconv-listener

# Verify installations
echo "Verifying installations..."
if command -v convert >/dev/null 2>&1; then
    echo "✓ ImageMagick installed successfully"
    convert -version | head -n 1
else
    echo "✗ ImageMagick installation failed"
    exit 1
fi

if command -v unoconv >/dev/null 2>&1; then
    echo "✓ unoconv installed successfully"
    unoconv --version | head -n 1
else
    echo "✗ unoconv installation failed"
    exit 1
fi

if systemctl is-active --quiet unoconv-listener; then
    echo "✓ unoconv listener service running"
else
    echo "✗ unoconv listener service failed to start"
    echo "Check service status with: sudo systemctl status unoconv-listener"
    exit 1
fi

echo "Setup completed successfully!"

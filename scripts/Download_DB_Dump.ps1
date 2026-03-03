# MySQL Dump Downloader for Windows (PowerShell)
# This script downloads MySQL dump files from a remote server using SCP

# Display header
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "                MySQL Dump Downloader (PS)" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan

# SSH connection details
$sshHost = "145.223.98.53"
$sshPort = 1024
$sshUser = "kulmapeck"
$sshPass = "EmoEmoroH@a123"
$remoteDir = "/backup"

# Create timestamp for filename
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$downloadsFolder = [Environment]::GetFolderPath("UserProfile") + "\Downloads"
$localPath = "$downloadsFolder\mysql_dump_$timestamp.sql"

Write-Host "`nDefault local path: $localPath"
Write-Host "Will search for SQL dumps in: $remoteDir"

# Check if scp is available
try {
    $null = Get-Command scp -ErrorAction Stop
    Write-Host "`nSCP command found." -ForegroundColor Green
}
catch {
    Write-Host "`nSCP command not found. Please install OpenSSH Client from Windows Settings." -ForegroundColor Red
    Write-Host "Go to Settings > Apps > Optional Features > Add a feature > OpenSSH Client" -ForegroundColor Yellow
    Write-Host "`nPress any key to exit..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 1
}

# Function to securely store password for SCP
function Create-SshKey {
    $keyFile = "$env:TEMP\scp_key_temp.txt"
    $sshPass | Out-File -FilePath $keyFile -Encoding ascii
    return $keyFile
}

# Create temporary key file
$keyFile = Create-SshKey

try {
    Write-Host "`nConnecting to $sshHost`:$sshPort as $sshUser..."
    Write-Host "This may take a minute, please wait..." -ForegroundColor Yellow

    # First, list SQL files in the backup directory
    Write-Host "`nListing SQL files in $remoteDir..." -ForegroundColor Cyan
    
    # Use SSH to list files
    $sshCommand = "ls -lh $remoteDir/*.sql 2>/dev/null | awk '{print NR \". \" \$9 \" (\" \$5 \")\"}' || echo 'No SQL files found'"
    $fileList = ssh -p $sshPort -o "StrictHostKeyChecking=no" $sshUser@$sshHost $sshCommand
    
    if ($fileList -eq "No SQL files found") {
        Write-Host "No SQL files found in $remoteDir" -ForegroundColor Yellow
        exit 0
    }
    
    # Display file list
    $fileList | ForEach-Object { Write-Host $_ }
    
    # Ask user to select a file
    Write-Host "`nEnter the number of the file to download (or q to quit): " -ForegroundColor Cyan -NoNewline
    $fileNumber = Read-Host
    
    if ($fileNumber -eq "q") {
        Write-Host "Exiting program." -ForegroundColor Yellow
        exit 0
    }
    
    # Get the selected file path
    $selectedFile = $fileList | Where-Object { $_ -match "^$fileNumber\." }
    if (-not $selectedFile) {
        Write-Host "Invalid selection." -ForegroundColor Red
        exit 1
    }
    
    # Extract the file path from the selected line
    $remotePath = ($selectedFile -split " ")[1]
    
    # Update local path with the selected filename
    $fileName = Split-Path $remotePath -Leaf
    $localPath = "$downloadsFolder\$fileName"
    
    Write-Host "`nDownloading $remotePath to $localPath..." -ForegroundColor Cyan
    Write-Host "This may take a while depending on the file size..." -ForegroundColor Yellow
    
    # Download the file using SCP
    $scpCommand = "scp -P $sshPort -o ""StrictHostKeyChecking=no"" $sshUser@$sshHost`:""$remotePath"" ""$localPath"""
    Write-Host "Running: $scpCommand" -ForegroundColor DarkGray
    
    # Execute the SCP command
    Invoke-Expression $scpCommand
    
    if ($LASTEXITCODE -eq 0) {
        $fileInfo = Get-Item $localPath
        $fileSizeMB = [math]::Round($fileInfo.Length / 1MB, 2)
        
        Write-Host "`nDownload complete!" -ForegroundColor Green
        Write-Host "  Source: $remotePath"
        Write-Host "  Destination: $localPath"
        Write-Host "  Size: $fileSizeMB MB"
        
        Write-Host "`nNext steps:" -ForegroundColor Cyan
        Write-Host "1. Split the dump file using:"
        Write-Host "   python split_mysql_dump.py ""$localPath"" ""C:\path\to\output_dir"""
        Write-Host "2. Apply database settings:"
        Write-Host "   python database_settings_extractor_and_importer.py extract ""$localPath"" ""C:\path\to\settings.sql"""
        Write-Host "   python database_settings_extractor_and_importer.py import ""C:\path\to\settings.sql"" --database your_db_name"
    }
    else {
        Write-Host "`nDownload failed with error code $LASTEXITCODE." -ForegroundColor Red
    }
}
catch {
    Write-Host "`nAn error occurred: $_" -ForegroundColor Red
}
finally {
    # Clean up the temporary key file
    if (Test-Path $keyFile) {
        Remove-Item $keyFile -Force
    }
    
    Write-Host "`nPress any key to exit..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}

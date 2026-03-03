# MySQL Dump Downloader for Windows (Simple PowerShell Version)
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

# Define the remote file path
$remotePath = "/backup/kulma2146700_20250408_020001.sql"
$localPath = "$downloadsFolder\kulma2146700_20250408_020001.sql"

Write-Host "`nAttempting to download database dump file:" -ForegroundColor Cyan
Write-Host "Remote path: $remotePath"
Write-Host "Local path: $localPath"
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

Write-Host "`nPress any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

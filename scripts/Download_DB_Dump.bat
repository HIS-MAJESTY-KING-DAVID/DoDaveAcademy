@echo off
echo ============================================================
echo                MySQL Dump Downloader (Batch)
echo ============================================================

REM Set variables
set SSH_HOST=145.223.98.53
set SSH_PORT=1024
set SSH_USER=kulmapeck
set SSH_PASS=EmoEmoroH@a123
set REMOTE_DIR=/backup
set TIMESTAMP=%date:~10,4%%date:~4,2%%date:~7,2%_%time:~0,2%%time:~3,2%%time:~6,2%
set TIMESTAMP=%TIMESTAMP: =0%
set LOCAL_PATH=%USERPROFILE%\Downloads\mysql_dump_%TIMESTAMP%.sql

echo.
echo Looking for SCP command...
where scp >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo SCP command not found. Please install OpenSSH Client from Windows Settings.
    echo Go to Settings ^> Apps ^> Optional Features ^> Add a feature ^> OpenSSH Client
    echo.
    pause
    exit /b 1
)

echo.
echo Connecting to %SSH_HOST%:%SSH_PORT% as %SSH_USER%...
echo This may take a minute, please wait...

REM First, list files in the backup directory
echo.
echo Listing SQL files in %REMOTE_DIR%:
scp -P %SSH_PORT% %SSH_USER%@%SSH_HOST%:"ls -lh %REMOTE_DIR%/*.sql 2>/dev/null | awk '{print NR \". \" $9 \" (\" $5 \")\"} || echo \"No SQL files found\"'" list_output.txt
type list_output.txt

echo.
set /p FILE_NUMBER=Enter the number of the file to download (or q to quit): 

if "%FILE_NUMBER%"=="q" (
    echo Exiting program.
    exit /b 0
)

REM Get the filename from the list
findstr /b "%FILE_NUMBER%\." list_output.txt > selected_file.txt
for /f "tokens=2 delims=. " %%a in (selected_file.txt) do set REMOTE_FILE=%%a

if "%REMOTE_FILE%"=="" (
    echo Invalid selection.
    exit /b 1
)

echo.
echo Downloading %REMOTE_FILE% to %LOCAL_PATH%...
echo This may take a while depending on the file size...

REM Download the selected file
scp -P %SSH_PORT% %SSH_USER%@%SSH_HOST%:"%REMOTE_FILE%" "%LOCAL_PATH%"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo Download complete!
    echo   Source: %REMOTE_FILE%
    echo   Destination: %LOCAL_PATH%
    
    echo.
    echo Next steps:
    echo 1. Split the dump file using:
    echo    python split_mysql_dump.py "%LOCAL_PATH%" "C:\path\to\output_dir"
    echo 2. Apply database settings:
    echo    python database_settings_extractor_and_importer.py extract "%LOCAL_PATH%" "C:\path\to\settings.sql"
    echo    python database_settings_extractor_and_importer.py import "C:\path\to\settings.sql" --database your_db_name
) else (
    echo.
    echo Download failed with error code %ERRORLEVEL%.
)

REM Clean up temporary files
del list_output.txt 2>nul
del selected_file.txt 2>nul

echo.
pause

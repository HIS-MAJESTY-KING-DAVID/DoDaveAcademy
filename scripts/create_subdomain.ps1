# Load API key from .env.local
$envFile = "$PSScriptRoot\.env.local"
if (Test-Path $envFile) {
    Get-Content $envFile | ForEach-Object {
        if ($_ -match "HOSTINGER_API_KEY=(.*)") {
            $env:HOSTINGER_API_KEY = $matches[1].Trim('"')
        }
    }
}

if (-not $env:HOSTINGER_API_KEY) {
    Write-Error "HOSTINGER_API_KEY not found in .env.local"
    exit 1
}

$domain = "dodave.tech"
$subdomain = "academy"
$targetIp = Read-Host "Enter the IP address for $subdomain.$domain (e.g., 185.185.185.185)"

if (-not $targetIp) {
    Write-Error "IP address is required."
    exit 1
}

$headers = @{
    "Authorization" = "Bearer $env:HOSTINGER_API_KEY"
    "Content-Type" = "application/json"
}

$body = @{
    records = @(
        @{
            type = "A"
            name = $subdomain
            content = $targetIp
            ttl = 14400
            priority = 0
            port = 0
            weight = 0
        }
    )
} | ConvertTo-Json -Depth 5

$url = "https://api.hostinger.com/v1/dns/zones/$domain/records"

Write-Host "Creating A record for $subdomain.$domain pointing to $targetIp..."

try {
    $response = Invoke-RestMethod -Uri $url -Method Put -Headers $headers -Body $body -ErrorAction Stop
    Write-Host "Successfully created subdomain!"
    $response | ConvertTo-Json -Depth 5
} catch {
    Write-Host "Error creating subdomain: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        $stream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        Write-Host "Response Body: $($reader.ReadToEnd())"
    }
}

$wc = New-Object System.Net.WebClient
$wc.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")

try {
    $wc.DownloadFile("https://upload.wikimedia.org/wikipedia/commons/e/ef/MSME_logo_%28colour%29.svg", "d:\Sachin projects\CIMP - BIIF Website\assets\images\official-logos\msme-official.svg")
    Write-Host "Downloaded MSME official SVG!"
} catch {
    Write-Host "Error MSME: $($_.Exception.Message)"
}

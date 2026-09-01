$wc = New-Object System.Net.WebClient
$wc.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)")

try {
    $wc.DownloadFile("https://raw.githubusercontent.com/Nithesh-hash/Smart-Attendance-Segregator/master/static/images/iic-logo.png", "d:\Sachin projects\CIMP - BIIF Website\assets\images\official-logos\iic-real-logo.png")
    Write-Host "Downloaded IIC real logo 1!"
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}

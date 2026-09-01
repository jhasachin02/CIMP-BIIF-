$wc = New-Object System.Net.WebClient
$wc.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)")

$urls = @(
    "https://crceiic.github.io/assets/img/iic-logo.png",
    "https://iic-srmrmp.com/wp-content/uploads/2021/04/IIC-logo.png",
    "https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Ministry_of_Education_India.svg/512px-Ministry_of_Education_India.svg.png"
)

foreach ($u in $urls) {
    try {
        $filename = [System.IO.Path]::GetFileName($u)
        $outPath = "d:\Sachin projects\CIMP - BIIF Website\assets\images\official-logos\$filename"
        $wc.DownloadFile($u, $outPath)
        Write-Host "Success downloaded: $u -> $filename"
    } catch {
        Write-Host "Failed: $u : $($_.Exception.Message)"
    }
}

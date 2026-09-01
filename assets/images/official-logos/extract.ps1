Add-Type -AssemblyName System.Drawing
$filePath = "d:\Sachin projects\CIMP - BIIF Website\assets\images\PGDM-IEV-supporters.jpg"
$img = [System.Drawing.Image]::FromFile($filePath)
$w = $img.Width
$h = $img.Height

Write-Host "Width: $w, Height: $h"

# 1. Crop IIC Logo
$iicX = [int]($w * 0.575)
$iicW = [int]($w * 0.285)
$rectIIC = New-Object System.Drawing.Rectangle($iicX, 0, $iicW, $h)
$bmpIIC = New-Object System.Drawing.Bitmap($iicW, $h)
$gIIC = [System.Drawing.Graphics]::FromImage($bmpIIC)
$gIIC.DrawImage($img, (New-Object System.Drawing.Rectangle(0, 0, $iicW, $h)), $rectIIC, [System.Drawing.GraphicsUnit]::Pixel)
$bmpIIC.Save("d:\Sachin projects\CIMP - BIIF Website\assets\images\official-logos\iic-official-logo.png", [System.Drawing.Imaging.ImageFormat]::Png)
$gIIC.Dispose()
$bmpIIC.Dispose()

# 2. Crop MSME Logo
$msmeX = [int]($w * 0.86)
$msmeW = [int]($w * 0.14)
$rectMSME = New-Object System.Drawing.Rectangle($msmeX, 0, $msmeW, $h)
$bmpMSME = New-Object System.Drawing.Bitmap($msmeW, $h)
$gMSME = [System.Drawing.Graphics]::FromImage($bmpMSME)
$gMSME.DrawImage($img, (New-Object System.Drawing.Rectangle(0, 0, $msmeW, $h)), $rectMSME, [System.Drawing.GraphicsUnit]::Pixel)
$bmpMSME.Save("d:\Sachin projects\CIMP - BIIF Website\assets\images\official-logos\msme-official-logo.png", [System.Drawing.Imaging.ImageFormat]::Png)
$gMSME.Dispose()
$bmpMSME.Dispose()

$img.Dispose()
Write-Host "Logos successfully extracted!"

# Image Compression Script for Web Optimization
# This script compresses large images to reduce repository size

Add-Type -AssemblyName System.Drawing

function Compress-Image {
    param(
        [string]$InputPath,
        [string]$OutputPath,
        [int]$Quality = 75,
        [int]$MaxWidth = 1920,
        [int]$MaxHeight = 1080
    )
    
    try {
        # Load the original image
        $originalImage = [System.Drawing.Image]::FromFile($InputPath)
        
        # Calculate new dimensions while maintaining aspect ratio
        $ratio = [Math]::Min($MaxWidth / $originalImage.Width, $MaxHeight / $originalImage.Height)
        if ($ratio -ge 1) { $ratio = 1 }
        
        $newWidth = [int]($originalImage.Width * $ratio)
        $newHeight = [int]($originalImage.Height * $ratio)
        
        # Create new bitmap with optimized size
        $newImage = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
        $graphics = [System.Drawing.Graphics]::FromImage($newImage)
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $graphics.CompositingHigh = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
        
        # Draw the resized image
        $graphics.DrawImage($originalImage, 0, 0, $newWidth, $newHeight)
        
        # Set up JPEG encoder with quality settings
        $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
        $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, $Quality)
        
        # Save the compressed image
        $newImage.Save($OutputPath, $jpegCodec, $encoderParams)
        
        # Clean up
        $graphics.Dispose()
        $newImage.Dispose()
        $originalImage.Dispose()
        
        $originalSize = (Get-Item $InputPath).Length / 1MB
        $newSize = (Get-Item $OutputPath).Length / 1MB
        $savings = $originalSize - $newSize
        
        Write-Host "Compressed $([System.IO.Path]::GetFileName($InputPath)): $([math]::Round($originalSize,2))MB -> $([math]::Round($newSize,2))MB (Saved: $([math]::Round($savings,2))MB)"
        
        return $true
    }
    catch {
        Write-Error "Failed to compress $InputPath : $($_.Exception.Message)"
        return $false
    }
}

# Compress images in editorial folder
Write-Host "Starting image compression for editorial folder..."
$editorialPath = "assets\editorial"
$compressedCount = 0
$totalSavings = 0

Get-ChildItem $editorialPath -Filter "*.JPG" | ForEach-Object {
    $originalSize = $_.Length / 1MB
    if ($originalSize -gt 2) {  # Only compress files larger than 2MB
        $backupPath = $_.FullName + ".backup"
        Copy-Item $_.FullName $backupPath
        
        if (Compress-Image -InputPath $_.FullName -OutputPath $_.FullName -Quality 80 -MaxWidth 1920 -MaxHeight 1080) {
            $newSize = (Get-Item $_.FullName).Length / 1MB
            $totalSavings += ($originalSize - $newSize)
            $compressedCount++
            Remove-Item $backupPath  # Remove backup if compression successful
        } else {
            Move-Item $backupPath $_.FullName  # Restore backup if compression failed
        }
    }
}

Get-ChildItem $editorialPath -Filter "*.jpeg" | ForEach-Object {
    $originalSize = $_.Length / 1MB
    if ($originalSize -gt 2) {  # Only compress files larger than 2MB
        $backupPath = $_.FullName + ".backup"
        Copy-Item $_.FullName $backupPath
        
        if (Compress-Image -InputPath $_.FullName -OutputPath $_.FullName -Quality 80 -MaxWidth 1920 -MaxHeight 1080) {
            $newSize = (Get-Item $_.FullName).Length / 1MB
            $totalSavings += ($originalSize - $newSize)
            $compressedCount++
            Remove-Item $backupPath  # Remove backup if compression successful
        } else {
            Move-Item $backupPath $_.FullName  # Restore backup if compression failed
        }
    }
}

Write-Host "`nCompression completed!"
Write-Host "Files compressed: $compressedCount"
Write-Host "Total space saved: $([math]::Round($totalSavings,2)) MB"
Write-Host "New editorial folder size: $([math]::Round(((Get-ChildItem $editorialPath -Recurse -File | Measure-Object -Property Length -Sum).Sum / 1MB),2)) MB"
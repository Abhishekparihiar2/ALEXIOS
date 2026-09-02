$filePath = "dist\assets\index-D80J1GTo.js"
$content = [System.IO.File]::ReadAllText($filePath)
$idx = $content.IndexOf("Completed Reports")
if ($idx -ge 0) {
    $start = [Math]::Max(0, $idx - 50)
    Write-Host $content.Substring($start, 1000)
}
$idx = $content.IndexOf("Search reports...", $idx)
if ($idx -ge 0) {
    $start = [Math]::Max(0, $idx - 50)
    Write-Host "`n---`n"
    Write-Host $content.Substring($start, 1000)
}

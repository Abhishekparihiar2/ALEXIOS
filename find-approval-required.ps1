$filePath = "dist\assets\index-D80J1GTo.js"
$content = [System.IO.File]::ReadAllText($filePath)
$idx = $content.IndexOf("No Approval Required")
$start = [Math]::Max(0, $idx - 50)
Write-Host $content.Substring($start, 1000)

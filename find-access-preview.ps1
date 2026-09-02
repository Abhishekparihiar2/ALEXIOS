$filePath = "dist\assets\index-D80J1GTo.js"
$content = [System.IO.File]::ReadAllText($filePath)
$idx = $content.IndexOf("Access Preview")
$start = [Math]::Max(0, $idx - 300)
Write-Host $content.Substring($start, 500)

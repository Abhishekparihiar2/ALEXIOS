$filePath = "dist\assets\index-D80J1GTo.js"
$content = [System.IO.File]::ReadAllText($filePath)
$pattern = '(?i).{0,200}Filters.{0,50}'
$matches = [regex]::Matches($content, $pattern)
$i = 1
foreach ($m in $matches) {
    Write-Host "Match $i : $($m.Value)"
    Write-Host "---"
    $i++
}

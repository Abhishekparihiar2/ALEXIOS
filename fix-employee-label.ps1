$filePath = "dist\assets\index-D80J1GTo.js"
$content = [System.IO.File]::ReadAllText($filePath)

# Fix occurrence 1: fe([...ye,G.target.value]) -> fe([G.target.value])
$old1 = 'G.target.value&&!ye.includes(G.target.value)&&(fe([...ye,G.target.value])'
$new1 = 'G.target.value&&(fe([G.target.value])'

# Fix occurrence 2: I([...D,ke.target.value]) -> I([ke.target.value])
$old2 = 'ke.target.value&&!D.includes(ke.target.value)&&(I([...D,ke.target.value])'
$new2 = 'ke.target.value&&(I([ke.target.value])'

$count1 = ($content -split [regex]::Escape($old1)).Length - 1
$count2 = ($content -split [regex]::Escape($old2)).Length - 1
Write-Host "Pattern 1 found: $count1"
Write-Host "Pattern 2 found: $count2"

$content = $content.Replace($old1, $new1)
$content = $content.Replace($old2, $new2)
[System.IO.File]::WriteAllText($filePath, $content)
Write-Host "Done"

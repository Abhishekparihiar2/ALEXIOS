$filePath = "dist\assets\index-D80J1GTo.js"
$content = [System.IO.File]::ReadAllText($filePath)

$old1 = 'className:"bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3"'
$new1 = 'className:"bg-blue-900/20 border border-blue-500/30 rounded-xl p-4 flex items-start gap-3"'

$old2 = 'className:"w-5 h-5 text-blue-600 shrink-0 mt-0.5"'
$new2 = 'className:"w-5 h-5 text-blue-400 shrink-0 mt-0.5"'

$old3 = 'className:"text-sm font-bold text-blue-900"'
$new3 = 'className:"text-sm font-bold text-blue-400"'

$old4 = 'className:"text-xs text-blue-700 mt-1"'
$new4 = 'className:"text-xs text-blue-300 mt-1"'

$content = $content.Replace($old1, $new1)
$content = $content.Replace($old2, $new2)
$content = $content.Replace($old3, $new3)
$content = $content.Replace($old4, $new4)

[System.IO.File]::WriteAllText($filePath, $content)
Write-Host "Replaced Access Preview theme colors"

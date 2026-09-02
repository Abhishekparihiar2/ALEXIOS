$filePath = "dist\assets\index-D80J1GTo.js"
$content = [System.IO.File]::ReadAllText($filePath)

$old1 = 'className:"flex items-start gap-4 p-4 rounded-xl border-2 border-blue-500 bg-blue-50/30 cursor-pointer transition-colors shadow-sm relative overflow-hidden"'
$new1 = 'className:"flex items-start gap-4 p-4 rounded-xl border-2 border-blue-500 bg-blue-50/30 dark:bg-blue-900/20 dark:border-blue-500/70 cursor-pointer transition-colors shadow-sm relative overflow-hidden"'

$old2 = 'className:"mt-4 p-3 bg-white border border-blue-100 rounded-lg flex items-start gap-2 dark:bg-slate-900"'
$new2 = 'className:"mt-4 p-3 bg-white border border-blue-100 rounded-lg flex items-start gap-2 dark:bg-slate-900 dark:border-slate-700"'

$content = $content.Replace($old1, $new1)
$content = $content.Replace($old2, $new2)

[System.IO.File]::WriteAllText($filePath, $content)
Write-Host "Fixed workflow tab theme colors"

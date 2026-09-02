$filePath = "dist\assets\index-D80J1GTo.js"
$content = [System.IO.File]::ReadAllText($filePath)

$old = '"bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"'
$new = '"bg-slate-50/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50"'

$content = $content.Replace($old, $new)

[System.IO.File]::WriteAllText($filePath, $content)
Write-Host "Replaced Filter button classes"

$filePath = "dist\assets\index-D80J1GTo.js"
$content = [System.IO.File]::ReadAllText($filePath)

# Replace all possible incorrect filter button classes
$content = $content -replace 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50\b', 'bg-slate-900/50 border-slate-700/50 text-slate-300 hover:bg-slate-800/50'
$content = $content -replace 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800\b', 'bg-slate-900/50 border-slate-700/50 text-slate-300 hover:bg-slate-800/50'

# Also search for 'bg-white dark:bg-slate-900' right next to 'Filters'
$content = $content -replace 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-slate-800', 'bg-slate-900/50 border-slate-700/50 text-slate-300 hover:bg-slate-800/50'

[System.IO.File]::WriteAllText($filePath, $content)
Write-Host "Replaced classes"

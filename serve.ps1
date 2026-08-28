param (
    [int]$Port = 3000,
    [string]$Root = "$PSScriptRoot\dist"
)

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".htm"  = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".mjs"  = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".gif"  = "image/gif"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
    ".woff" = "font/woff"
    ".woff2"= "font/woff2"
    ".ttf"  = "font/ttf"
    ".map"  = "application/json"
}

$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$Port/"
$listener.Prefixes.Add($prefix)

try {
    $listener.Start()
} catch {
    Write-Host "Failed to start server on $prefix : $_" -ForegroundColor Red
    exit 1
}

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host " ALEXIOS Local Web Server is Running!" -ForegroundColor Green
Write-Host " URL: http://localhost:$Port" -ForegroundColor Yellow
Write-Host " Root Directory: $Root" -ForegroundColor Gray
Write-Host " Press Ctrl+C in console or kill task to stop" -ForegroundColor Gray
Write-Host "==========================================" -ForegroundColor Cyan

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $rawUrl = $request.RawUrl
        $path = $rawUrl.Split('?')[0]
        $decodedPath = [System.Uri]::UnescapeDataString($path)

        if ($decodedPath -eq "/" -or [string]::IsNullOrWhiteSpace($decodedPath)) {
            $filePath = Join-Path $Root "index.html"
        } else {
            $relativePath = $decodedPath.TrimStart('/').Replace('/', '\')
            $filePath = Join-Path $Root $relativePath
        }

        if (-not (Test-Path $filePath -PathType Leaf)) {
            # SPA Fallback or check if index.html
            $fallback = Join-Path $Root "index.html"
            if (Test-Path $fallback -PathType Leaf) {
                $filePath = $fallback
            } else {
                $response.StatusCode = 404
                $buffer = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
                $response.ContentLength64 = $buffer.Length
                $response.OutputStream.Write($buffer, 0, $buffer.Length)
                $response.Close()
                continue
            }
        }

        $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
        $contentType = $mimeTypes[$ext]
        if (-not $contentType) {
            $contentType = "application/octet-stream"
        }

        $bytes = [System.IO.File]::ReadAllBytes($filePath)
        $response.ContentType = $contentType
        $response.ContentLength64 = $bytes.Length
        $response.AddHeader("Access-Control-Allow-Origin", "*")
        $response.AddHeader("Cache-Control", "no-cache")
        $response.StatusCode = 200
        $response.OutputStream.Write($bytes, 0, $bytes.Length)
        $response.Close()
        
        Write-Host "[$([System.DateTime]::Now.ToString('HH:mm:ss'))] 200 $path ($contentType)" -ForegroundColor Green
    } catch {
        Write-Host "Error processing request: $_" -ForegroundColor Red
        if ($null -ne $response) {
            try { $response.Close() } catch {}
        }
    }
}

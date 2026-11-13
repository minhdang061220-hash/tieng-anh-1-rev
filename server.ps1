$port = 8085
$dir = Split-Path -Parent $MyInvocation.MyCommand.Path
if (-not $dir) { $dir = "C:\Users\PC\.gemini\antigravity\scratch\tieng-anh-1-global-success" }

# Tim dia chi IPv4 noi bo (Wi-Fi / LAN)
$ips = @()
try {
    $ipConfig = ipconfig | Out-String
    $ipMatches = [regex]::Matches($ipConfig, 'IPv4 Address[.\s]+:\s*([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+)')
    foreach ($m in $ipMatches) {
        $addr = $m.Groups[1].Value.Trim()
        if ($addr -notlike "127.*" -and $addr -notlike "169.254.*" -and ($ips -notcontains $addr)) {
            $ips += $addr
        }
    }
} catch {}

if ($ips.Count -eq 0) { $ips = @("192.168.1.13") }
$mainIp = $ips[0]

$server = New-Object System.Net.Sockets.TcpListener ([System.Net.IPAddress]::Any, $port)
$server.Start()

Clear-Host
Write-Output "=========================================================================="
Write-Output "        UNG DUNG BE HOC TIENG ANH 1 - GLOBAL SUCCESS DANG CHAY"
Write-Output "=========================================================================="
Write-Output ""
Write-Output "  [1] TREN MAY TINH NAY:"
Write-Output "      -> http://localhost:$port/"
Write-Output ""
Write-Output "  [2] TREN DIEN THOAI / IPAD / MAY TINH BANG:"
Write-Output "      -> http://$($mainIp):$port/"
Write-Output ""
Write-Output "  (Luu y: Dien thoai va may tinh can ket noi chung mang Wi-Fi)"
Write-Output "=========================================================================="
Write-Output "  Nhan Ctrl + C neu muon dung may chu web."
Write-Output ""

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
}

try {
    while ($true) {
        try {
            $client = $server.AcceptTcpClient()
            $stream = $client.GetStream()
            $reader = New-Object System.IO.StreamReader($stream, [System.Text.Encoding]::UTF8)
            
            $requestLine = $reader.ReadLine()
            if (-not [string]::IsNullOrEmpty($requestLine)) {
                $parts = $requestLine.Split(' ')
                $path = if ($parts.Length -ge 2) { $parts[1] } else { "/" }
                
                if ($path.Contains("?")) {
                    $path = $path.Substring(0, $path.IndexOf("?"))
                }
                if ($path -eq "/" -or $path -eq "") {
                    $path = "/index.html"
                }

                $localFile = Join-Path $dir ($path.TrimStart('/').Replace('/', '\'))
                if (Test-Path $localFile -PathType Leaf) {
                    $bytes = [System.IO.File]::ReadAllBytes($localFile)
                    $ext = [System.IO.Path]::GetExtension($localFile).ToLower()
                    $contentType = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
                    
                    $header = "HTTP/1.1 200 OK`r`n" +
                              "Content-Type: $contentType`r`n" +
                              "Content-Length: $($bytes.Length)`r`n" +
                              "Access-Control-Allow-Origin: *`r`n" +
                              "Connection: close`r`n`r`n"
                    $headerBytes = [System.Text.Encoding]::UTF8.GetBytes($header)
                    $stream.Write($headerBytes, 0, $headerBytes.Length)
                    $stream.Write($bytes, 0, $bytes.Length)
                } else {
                    $notFound = "HTTP/1.1 404 Not Found`r`nContent-Length: 9`r`nConnection: close`r`n`r`nNot Found"
                    $errBytes = [System.Text.Encoding]::UTF8.GetBytes($notFound)
                    $stream.Write($errBytes, 0, $errBytes.Length)
                }
            }
            $stream.Flush()
            $client.Close()
        } catch {
            # Bo qua loi ngat ket noi client de may chu luon chay ben bi
        }
    }
} finally {
    $server.Stop()
}

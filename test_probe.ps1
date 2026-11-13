$job = Start-Job -ScriptBlock {
    param($dir, $port)
    $server = New-Object System.Net.Sockets.TcpListener ([System.Net.IPAddress]::Any, $port)
    $server.Start()
    try {
        while ($true) {
            $client = $server.AcceptTcpClient()
            $stream = $client.GetStream()
            $reader = New-Object System.IO.StreamReader($stream, [System.Text.Encoding]::UTF8)
            $line = $reader.ReadLine()
            if ($line) {
                $parts = $line.Split(' ')
                $path = if ($parts.Length -ge 2) { $parts[1] } else { "/" }
                if ($path -eq "/" -or $path -eq "") { $path = "/index.html" }
                $localFile = Join-Path $dir ($path.TrimStart('/').Replace('/', '\'))
                if (Test-Path $localFile -PathType Leaf) {
                    $bytes = [System.IO.File]::ReadAllBytes($localFile)
                    $header = "HTTP/1.1 200 OK`r`nContent-Type: text/html; charset=utf-8`r`nContent-Length: $($bytes.Length)`r`nConnection: close`r`n`r`n"
                    $hb = [System.Text.Encoding]::UTF8.GetBytes($header)
                    $stream.Write($hb, 0, $hb.Length)
                    $stream.Write($bytes, 0, $bytes.Length)
                }
            }
            $stream.Flush()
            $client.Close()
        }
    } finally {
        $server.Stop()
    }
} -ArgumentList "C:\Users\PC\.gemini\antigravity\scratch\tieng-anh-1-global-success", 8099

Start-Sleep -Seconds 1
$res = curl.exe -s "http://127.0.0.1:8099/"
Write-Output "Probe result length: $($res.Length)"
Stop-Job $job
Remove-Job $job

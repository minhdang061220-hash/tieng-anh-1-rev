try {
    $l = New-Object System.Net.HttpListener
    $l.Prefixes.Add('http://*:8085/')
    $l.Start()
    Write-Output "Wildcard HttpListener OK"
    $l.Stop()
} catch {
    Write-Output "Wildcard HttpListener Failed: $($_.Exception.Message)"
}

try {
    $tcp = New-Object System.Net.Sockets.TcpListener ([System.Net.IPAddress]::Any, 8085)
    $tcp.Start()
    Write-Output "TcpListener Any OK"
    $tcp.Stop()
} catch {
    Write-Output "TcpListener Failed: $($_.Exception.Message)"
}

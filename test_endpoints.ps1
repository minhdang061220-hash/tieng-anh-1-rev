$r = Invoke-WebRequest -Uri 'http://localhost:8085/' -UseBasicParsing
Write-Output "Index: $($r.StatusCode) - $($r.Content.Length) bytes"

$js = Invoke-WebRequest -Uri 'http://localhost:8085/js/data.js' -UseBasicParsing
Write-Output "data.js: $($js.StatusCode) - $($js.Content.Length) bytes"

$app = Invoke-WebRequest -Uri 'http://localhost:8085/js/app.js' -UseBasicParsing
Write-Output "app.js: $($app.StatusCode) - $($app.Content.Length) bytes"

$css = Invoke-WebRequest -Uri 'http://localhost:8085/css/styles.css' -UseBasicParsing
Write-Output "styles.css: $($css.StatusCode) - $($css.Content.Length) bytes"

# Script para ejecutar el frontend de la florería
Write-Host "🌺 Iniciando el frontend de la florería..." -ForegroundColor Green

# Verificar si estamos en el directorio correcto
if (Test-Path "frontend") {
    Write-Host "✓ Directorio frontend encontrado" -ForegroundColor Green
} else {
    Write-Host "❌ Error: No se encontró el directorio frontend" -ForegroundColor Red
    Write-Host "Asegúrate de ejecutar este script desde la raíz del proyecto" -ForegroundColor Yellow
    exit 1
}

# Navegar al directorio frontend
Write-Host "📁 Navegando al directorio frontend..." -ForegroundColor Cyan
Set-Location frontend

# Verificar si node_modules existe
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependencias..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Error al instalar dependencias" -ForegroundColor Red
        exit 1
    }
    Write-Host "✓ Dependencias instaladas correctamente" -ForegroundColor Green
} else {
    Write-Host "✓ Dependencias ya están instaladas" -ForegroundColor Green
}

# Ejecutar el servidor de desarrollo
Write-Host "🚀 Iniciando servidor de desarrollo..." -ForegroundColor Cyan
Write-Host "La aplicación se abrirá en http://localhost:3000" -ForegroundColor Yellow
Write-Host "Presiona Ctrl+C para detener el servidor" -ForegroundColor Yellow
Write-Host ""

npm start 
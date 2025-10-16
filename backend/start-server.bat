@echo off
echo Iniciando servidor de la API Floreria...
echo.
echo Asegurate de que:
echo 1. La base de datos MySQL este corriendo
echo 2. Las migraciones esten ejecutadas
echo 3. Los seeders esten ejecutados
echo.
echo Presiona Ctrl+C para detener el servidor
echo.
node app.js
pause 
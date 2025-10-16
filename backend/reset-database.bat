@echo off
echo 🔄 Reseteando base de datos...
echo.

echo 📦 Revirtiendo todas las migraciones...
npx sequelize-cli db:migrate:undo:all
if %errorlevel% neq 0 (
    echo ❌ Error revirtiendo migraciones
    pause
    exit /b 1
)

echo.
echo 📦 Ejecutando todas las migraciones...
npx sequelize-cli db:migrate
if %errorlevel% neq 0 (
    echo ❌ Error ejecutando migraciones
    pause
    exit /b 1
)

echo.
echo 🎉 ¡Base de datos reseteada exitosamente!
echo.
echo 📋 Tablas creadas:
echo    - roles
echo    - usuarios
echo    - categorias
echo    - proveedores
echo    - productos
echo    - ubicaciones
echo    - inventarios
echo    - movimientos
echo    - ajustes_inventarios
echo    - ordenes_compras
echo    - detalles_ordenes_compras
echo.
echo 🚀 Ahora puedes ejecutar los seeders con:
echo    node run-seeders.js
echo.
pause 
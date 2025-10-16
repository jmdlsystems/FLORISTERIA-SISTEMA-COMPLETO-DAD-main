@echo off
echo 🧹 Limpiando y configurando base de datos desde cero...
echo.

echo 📦 Eliminando base de datos existente...
npx sequelize-cli db:drop
if %errorlevel% neq 0 (
    echo ⚠️  No hay base de datos que eliminar o ya fue eliminada
)

echo.
echo 📦 Creando nueva base de datos...
npx sequelize-cli db:create
if %errorlevel% neq 0 (
    echo ❌ Error creando base de datos
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
echo 🎉 ¡Base de datos configurada exitosamente!
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
echo    npm run db:seed-full
echo    o
echo    node run-seeders.js
echo.
pause 
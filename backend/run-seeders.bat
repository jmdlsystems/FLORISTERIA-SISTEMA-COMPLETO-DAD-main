@echo off
echo 🌱 Ejecutando seeders de ubicaciones para la floreria...
echo.

cd /d "%~dp0"

echo 📋 Ejecutando seeder de ubicaciones...
npx sequelize-cli db:seed --seed 20240620130000-ubicaciones-floreria.js
npx sequelize-cli db:seed --seed 20240620110000-roles-floreria.js
npx sequelize-cli db:seed --seed 20240620120000-demo-usuario.js
npx sequelize-cli db:seed --seed 20240620130000-ubicaciones-floreria.js
npx sequelize-cli db:seed --seed 20240620140000-categorias-floreria.js
npx sequelize-cli db:seed --seed 20240620150000-proveedores-floreria.js
npx sequelize-cli db:seed --seed 20240620160000-productos-floreria.js
npx sequelize-cli db:seed --seed 20240620170000-inventario-floreria.js
npx sequelize-cli db:seed --seed 20240620180000-movimientos-floreria.js
npx sequelize-cli db:seed --seed 20240620190000-ajustes-inventario-floreria.js
npx sequelize-cli db:seed --seed 20240620200000-ordenes-compra-floreria.js
npx sequelize-cli db:seed --seed 20240620210000-detalles-orden-compra-floreria.js
npx sequelize-cli db:seed --seed 20240620220000-pedidos-floreria.js

if %errorlevel% equ 0 (
    echo.
    echo ✅ Seeder ejecutado exitosamente
    echo 📋 Ubicaciones creadas:
    echo    - Refrigerador Principal
    echo    - Refrigerador Secundario
    echo    - Sala de Exhibición
    echo    - Almacén de Macetas
    echo    - Estantería de Accesorios
    echo    - Área de Trabajo
    echo    - Invernadero
    echo    - Almacén de Suelos
    echo    - Refrigerador de Rosas
    echo    - Área de Entrega
    echo    - Estantería de Plantas Artificiales
    echo    - Almacén de Herramientas
    echo.
    echo 🎉 ¡Ubicaciones de la floreria creadas exitosamente!
) else (
    echo.
    echo ❌ Error ejecutando el seeder
)

pause 
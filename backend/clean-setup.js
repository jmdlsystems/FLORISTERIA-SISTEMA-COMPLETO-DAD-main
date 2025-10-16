const { exec } = require('child_process');
const path = require('path');

console.log('🧹 Limpiando y configurando base de datos desde cero...\n');

// Función para ejecutar comandos de Sequelize
function runCommand(command, description) {
  return new Promise((resolve, reject) => {
    console.log(`📦 ${description}...`);
    exec(command, { cwd: path.join(__dirname) }, (error, stdout, stderr) => {
      if (error) {
        // Si es un error de "no existe la tabla", lo ignoramos
        if (error.message.includes('no existe') || error.message.includes('does not exist')) {
          console.log(`⚠️  ${description} - No hay nada que limpiar`);
          resolve(stdout);
          return;
        }
        console.error(`❌ Error en ${description}:`, error.message);
        reject(error);
        return;
      }
      
      if (stderr && !stderr.includes('no existe') && !stderr.includes('does not exist')) {
        console.error(`⚠️  Advertencias en ${description}:`, stderr);
      }
      
      console.log(`✅ ${description} completado`);
      resolve(stdout);
    });
  });
}

async function cleanSetup() {
  try {
    // 1. Intentar eliminar la base de datos si existe
    await runCommand('npx sequelize-cli db:drop', 'Eliminando base de datos existente');
    
    // 2. Crear nueva base de datos
    await runCommand('npx sequelize-cli db:create', 'Creando nueva base de datos');
    
    // 3. Ejecutar todas las migraciones
    await runCommand('npx sequelize-cli db:migrate', 'Ejecutando todas las migraciones');
    
    console.log('\n🎉 ¡Base de datos configurada exitosamente!');
    console.log('\n📋 Tablas creadas:');
    console.log('   - roles');
    console.log('   - usuarios');
    console.log('   - categorias');
    console.log('   - proveedores');
    console.log('   - productos');
    console.log('   - ubicaciones');
    console.log('   - inventarios');
    console.log('   - movimientos');
    console.log('   - ajustes_inventarios');
    console.log('   - ordenes_compras');
    console.log('   - detalles_ordenes_compras');
    
    console.log('\n🚀 Ahora puedes ejecutar los seeders con:');
    console.log('   npm run db:seed-full');
    console.log('   o');
    console.log('   node run-seeders.js');
    
  } catch (error) {
    console.error('\n❌ Error configurando la base de datos:', error.message);
    console.log('\n💡 Intenta ejecutar manualmente:');
    console.log('   npx sequelize-cli db:drop');
    console.log('   npx sequelize-cli db:create');
    console.log('   npx sequelize-cli db:migrate');
    process.exit(1);
  }
}

// Ejecutar el setup limpio
cleanSetup(); 
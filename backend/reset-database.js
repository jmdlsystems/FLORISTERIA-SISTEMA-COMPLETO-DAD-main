const { exec } = require('child_process');
const path = require('path');

console.log('🔄 Reseteando base de datos...\n');

// Función para ejecutar comandos de Sequelize
function runCommand(command, description) {
  return new Promise((resolve, reject) => {
    console.log(`📦 ${description}...`);
    exec(command, { cwd: path.join(__dirname) }, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error en ${description}:`, error);
        reject(error);
        return;
      }
      
      if (stderr) {
        console.error(`⚠️  Advertencias en ${description}:`, stderr);
      }
      
      console.log(`✅ ${description} completado`);
      resolve(stdout);
    });
  });
}

async function resetDatabase() {
  try {
    // 1. Revertir todas las migraciones
    await runCommand('npx sequelize-cli db:migrate:undo:all', 'Revirtiendo todas las migraciones');
    
    // 2. Ejecutar todas las migraciones
    await runCommand('npx sequelize-cli db:migrate', 'Ejecutando todas las migraciones');
    
    console.log('\n🎉 ¡Base de datos reseteada exitosamente!');
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
    console.log('   node run-seeders.js');
    
  } catch (error) {
    console.error('\n❌ Error reseteando la base de datos:', error);
    process.exit(1);
  }
}

// Ejecutar el reseteo
resetDatabase(); 
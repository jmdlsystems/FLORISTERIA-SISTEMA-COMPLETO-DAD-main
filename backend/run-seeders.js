const { exec } = require('child_process');
const path = require('path');

console.log('🌱 Ejecutando seeders de la floristería...\n');

// Lista de seeders en orden de ejecución
const seeders = [
  '20240620110000-roles-floreria.js',
  '20240620120000-demo-usuario.js',
  '20240620130000-ubicaciones-floreria.js',
  '20240620140000-categorias-floreria.js',
  '20240620150000-proveedores-floreria.js',
  '20240620160000-productos-floreria.js',
  '20240620170000-inventario-floreria.js',
  '20240620180000-movimientos-floreria.js',
  '20240620190000-ajustes-inventario-floreria.js',
  '20240620200000-ordenes-compra-floreria.js',
  '20240620210000-detalles-orden-compra-floreria.js',
  '20240620220000-pedidos-floreria.js'
];

let currentIndex = 0;

function runSeeder() {
  if (currentIndex >= seeders.length) {
    console.log('\n🎉 ¡Todos los seeders ejecutados exitosamente!');
    console.log('\n📋 Resumen de datos creados:');
    console.log('   - 4 Roles (Administrador, Repartidor, Florista, Usuario)');
    console.log('   - 4 Usuarios demo (admin@demo.com, repartidor@demo.com, florista@demo.com, usuario@demo.com)');
    console.log('   - 12 Ubicaciones (refrigeradores, almacenes, áreas de trabajo)');
    console.log('   - 10 Categorías (rosas, tulipanes, girasoles, etc.)');
    console.log('   - 8 Proveedores (floristerías y viveros)');
    console.log('   - 15 Productos (flores, arreglos, accesorios)');
    console.log('   - 15 Registros de inventario');
    console.log('   - 10 Movimientos de inventario');
    console.log('   - 12 Ajustes de inventario');
    console.log('   - 8 Órdenes de compra');
    console.log('   - 12 Detalles de orden de compra');
    console.log('   - 6 Pedidos de clientes');
    console.log('\n🔑 Credenciales de acceso:');
    console.log('   - Administrador: admin@demo.com / admin123');
    console.log('   - Usuario: usuario@demo.com / usuario123');
    console.log('   - Florista: florista@demo.com / usuario123');
    console.log('   - Repartidor: repartidor@demo.com / usuario123');
    return;
  }

  const seeder = seeders[currentIndex];
  console.log(`📦 Ejecutando seeder: ${seeder}`);
  
  const seederCommand = `npx sequelize-cli db:seed --seed ${seeder}`;
  
  exec(seederCommand, { cwd: path.join(__dirname) }, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error ejecutando ${seeder}:`, error);
      return;
    }
    
    if (stderr) {
      console.error(`⚠️  Advertencias en ${seeder}:`, stderr);
    }
    
    console.log(`✅ ${seeder} ejecutado exitosamente`);
    currentIndex++;
    runSeeder();
  });
}

// Iniciar la ejecución de seeders
runSeeder(); 
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('roles', [
      {
        id: 1,
        nombre: 'ADMINISTRADOR',
        descripcion: 'Acceso completo al sistema. Puede gestionar usuarios, roles, inventario, pedidos y todas las funcionalidades.',
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        nombre: 'REPARTIDOR',
        descripcion: 'Encargado de la entrega de pedidos. Puede ver pedidos, actualizar estados de entrega y gestionar rutas.',
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        nombre: 'FLORISTA',
        descripcion: 'Encargado de la preparación de arreglos florales. Puede gestionar inventario, crear productos y preparar pedidos.',
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        nombre: 'USUARIO',
        descripcion: 'Usuario básico del sistema. Puede realizar pedidos y ver su historial de compras.',
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('roles', {
      nombre: ['ADMINISTRADOR', 'REPARTIDOR', 'FLORISTA', 'USUARIO']
    }, {});
  }
}; 
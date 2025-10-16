'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ordenes_compras', [
      {
        id: 1,
        proveedor_id: 1, // Flores del Valle
        usuario_id: 1, // Administrador
        fecha: new Date('2024-01-10'),
        estado: 'Completada',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        proveedor_id: 2, // Vivero San Pedro
        usuario_id: 1, // Administrador
        fecha: new Date('2024-01-12'),
        estado: 'Completada',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        proveedor_id: 3, // Invernaderos La Esperanza
        usuario_id: 3, // Florista
        fecha: new Date('2024-01-14'),
        estado: 'Completada',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        proveedor_id: 4, // Flores Exóticas del Sur
        usuario_id: 1, // Administrador
        fecha: new Date('2024-01-16'),
        estado: 'Completada',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        proveedor_id: 5, // Vivero Los Pinos
        usuario_id: 3, // Florista
        fecha: new Date('2024-01-18'),
        estado: 'Completada',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        proveedor_id: 6, // Flores de Importación Premium
        usuario_id: 1, // Administrador
        fecha: new Date('2024-01-20'),
        estado: 'Completada',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        proveedor_id: 7, // Vivero El Paraíso
        usuario_id: 3, // Florista
        fecha: new Date('2024-01-22'),
        estado: 'Completada',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        proveedor_id: 8, // Flores y Plantas Express
        usuario_id: 1, // Administrador
        fecha: new Date('2024-01-24'),
        estado: 'Completada',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ordenes_compras', {
      id: [1, 2, 3, 4, 5, 6, 7, 8]
    }, {});
  }
}; 
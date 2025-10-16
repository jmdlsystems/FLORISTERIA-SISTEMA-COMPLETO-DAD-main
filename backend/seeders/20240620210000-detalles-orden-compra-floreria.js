'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('detalles_ordenes_compras', [
      {
        id: 1,
        orden_compra_id: 1, // Orden Flores del Valle
        producto_id: 1, // Rosa Roja
        cantidad: 20,
        precio_unitario: 25.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        orden_compra_id: 1, // Orden Flores del Valle
        producto_id: 2, // Rosa Blanca
        cantidad: 15,
        precio_unitario: 28.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        orden_compra_id: 2, // Orden Vivero San Pedro
        producto_id: 3, // Tulipán Amarillo
        cantidad: 25,
        precio_unitario: 18.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        orden_compra_id: 2, // Orden Vivero San Pedro
        producto_id: 4, // Tulipán Rosa
        cantidad: 20,
        precio_unitario: 20.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        orden_compra_id: 3, // Orden Invernaderos La Esperanza
        producto_id: 5, // Girasol Grande
        cantidad: 15,
        precio_unitario: 15.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        orden_compra_id: 4, // Orden Flores Exóticas del Sur
        producto_id: 6, // Lirio Blanco
        cantidad: 10,
        precio_unitario: 35.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        orden_compra_id: 5, // Orden Vivero Los Pinos
        producto_id: 7, // Margarita Blanca
        cantidad: 30,
        precio_unitario: 12.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        orden_compra_id: 5, // Orden Vivero Los Pinos
        producto_id: 11, // Planta Suculenta
        cantidad: 8,
        precio_unitario: 45.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        orden_compra_id: 6, // Orden Flores de Importación Premium
        producto_id: 8, // Orquídea Phalaenopsis
        cantidad: 4,
        precio_unitario: 120.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        orden_compra_id: 7, // Orden Vivero El Paraíso
        producto_id: 9, // Crisantemo Amarillo
        cantidad: 20,
        precio_unitario: 22.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        orden_compra_id: 8, // Orden Flores y Plantas Express
        producto_id: 10, // Arreglo Romántico
        cantidad: 3,
        precio_unitario: 150.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        orden_compra_id: 8, // Orden Flores y Plantas Express
        producto_id: 12, // Lazo Decorativo
        cantidad: 50,
        precio_unitario: 8.00,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('detalles_ordenes_compras', {
      id: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    }, {});
  }
}; 
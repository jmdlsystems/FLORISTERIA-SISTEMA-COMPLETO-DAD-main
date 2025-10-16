'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ajustes_inventarios', [
      {
        id: 1,
        producto_id: 1, // Rosa Roja
        cantidad_ajustada: 50,
        motivo: 'Carga inicial de inventario',
        fecha: new Date('2024-01-15'),
        usuario_id: 1, // Administrador
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        producto_id: 2, // Rosa Blanca
        cantidad_ajustada: 45,
        motivo: 'Carga inicial de inventario',
        fecha: new Date('2024-01-15'),
        usuario_id: 1, // Administrador
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        producto_id: 3, // Tulipán Amarillo
        cantidad_ajustada: 30,
        motivo: 'Recepción de pedido del proveedor',
        fecha: new Date('2024-01-16'),
        usuario_id: 3, // Florista
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        producto_id: 1, // Rosa Roja
        cantidad_ajustada: -5,
        motivo: 'Venta de arreglo floral',
        fecha: new Date('2024-01-17'),
        usuario_id: 3, // Florista
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        producto_id: 2, // Rosa Blanca
        cantidad_ajustada: -3,
        motivo: 'Venta de arreglo floral',
        fecha: new Date('2024-01-17'),
        usuario_id: 3, // Florista
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        producto_id: 8, // Orquídea Phalaenopsis
        cantidad_ajustada: 8,
        motivo: 'Recepción de importación',
        fecha: new Date('2024-01-18'),
        usuario_id: 1, // Administrador
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        producto_id: 10, // Arreglo Romántico
        cantidad_ajustada: -1,
        motivo: 'Venta de arreglo especial',
        fecha: new Date('2024-01-19'),
        usuario_id: 3, // Florista
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        producto_id: 12, // Lazo Decorativo
        cantidad_ajustada: 100,
        motivo: 'Compra de accesorios',
        fecha: new Date('2024-01-20'),
        usuario_id: 3, // Florista
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        producto_id: 12, // Lazo Decorativo
        cantidad_ajustada: -15,
        motivo: 'Uso en arreglos florales',
        fecha: new Date('2024-01-21'),
        usuario_id: 3, // Florista
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        producto_id: 11, // Planta Suculenta
        cantidad_ajustada: 15,
        motivo: 'Recepción de plantas vivas',
        fecha: new Date('2024-01-22'),
        usuario_id: 3, // Florista
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        producto_id: 4, // Tulipán Rosa
        cantidad_ajustada: -2,
        motivo: 'Pérdida por daño en transporte',
        fecha: new Date('2024-01-23'),
        usuario_id: 3, // Florista
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        producto_id: 7, // Margarita Blanca
        cantidad_ajustada: 20,
        motivo: 'Recepción de pedido especial',
        fecha: new Date('2024-01-24'),
        usuario_id: 3, // Florista
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ajustes_inventarios', {
      id: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    }, {});
  }
}; 
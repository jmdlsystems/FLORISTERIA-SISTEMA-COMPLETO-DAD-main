'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('movimientos', [
      {
        id: 1,
        tipo: 'Incremento',
        producto_id: 1, // Rosa Roja
        cantidad: 50,
        fecha: new Date('2024-01-15'),
        usuario_id: 1, // Administrador
        descripcion: 'Carga inicial de inventario',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        tipo: 'Incremento',
        producto_id: 2, // Rosa Blanca
        cantidad: 45,
        fecha: new Date('2024-01-15'),
        usuario_id: 1, // Administrador
        descripcion: 'Carga inicial de inventario',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        tipo: 'Incremento',
        producto_id: 3, // Tulipán Amarillo
        cantidad: 30,
        fecha: new Date('2024-01-16'),
        usuario_id: 3, // Florista
        descripcion: 'Recepción de pedido del proveedor',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        tipo: 'Decremento',
        producto_id: 1, // Rosa Roja
        cantidad: 5,
        fecha: new Date('2024-01-17'),
        usuario_id: 3, // Florista
        descripcion: 'Venta de arreglo floral',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        tipo: 'Decremento',
        producto_id: 2, // Rosa Blanca
        cantidad: 3,
        fecha: new Date('2024-01-17'),
        usuario_id: 3, // Florista
        descripcion: 'Venta de arreglo floral',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        tipo: 'Incremento',
        producto_id: 8, // Orquídea Phalaenopsis
        cantidad: 8,
        fecha: new Date('2024-01-18'),
        usuario_id: 1, // Administrador
        descripcion: 'Recepción de importación',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        tipo: 'Decremento',
        producto_id: 10, // Arreglo Romántico
        cantidad: 1,
        fecha: new Date('2024-01-19'),
        usuario_id: 3, // Florista
        descripcion: 'Venta de arreglo especial',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        tipo: 'Incremento',
        producto_id: 12, // Lazo Decorativo
        cantidad: 100,
        fecha: new Date('2024-01-20'),
        usuario_id: 3, // Florista
        descripcion: 'Compra de accesorios',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        tipo: 'Decremento',
        producto_id: 12, // Lazo Decorativo
        cantidad: 15,
        fecha: new Date('2024-01-21'),
        usuario_id: 3, // Florista
        descripcion: 'Uso en arreglos florales',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        tipo: 'Incremento',
        producto_id: 11, // Planta Suculenta
        cantidad: 15,
        fecha: new Date('2024-01-22'),
        usuario_id: 3, // Florista
        descripcion: 'Recepción de plantas vivas',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('movimientos', {
      id: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }, {});
  }
}; 
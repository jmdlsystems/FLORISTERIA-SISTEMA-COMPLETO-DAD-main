'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Primero crear los pedidos
    const pedidos = await queryInterface.bulkInsert('pedidos', [
      {
        id: 1,
        cliente_nombre: 'María González',
        cliente_telefono: '555-0123',
        cliente_direccion: 'Calle Principal 123, Ciudad',
        cliente_email: 'maria@email.com',
        fecha_pedido: new Date('2024-01-15T10:30:00'),
        fecha_entrega: new Date('2024-01-16T14:00:00'),
        estado: 'pendiente',
        total: 85.50,
        metodo_pago: 'efectivo',
        notas: 'Para cumpleaños de mamá',
        usuario_id: 4, // Usuario
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        cliente_nombre: 'Carlos Rodríguez',
        cliente_telefono: '555-0456',
        cliente_direccion: 'Avenida Central 456, Ciudad',
        cliente_email: 'carlos@email.com',
        fecha_pedido: new Date('2024-01-14T15:45:00'),
        fecha_entrega: new Date('2024-01-15T12:00:00'),
        estado: 'en_preparacion',
        total: 120.00,
        metodo_pago: 'tarjeta',
        notas: 'Arreglo para aniversario',
        usuario_id: 4, // Usuario
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        cliente_nombre: 'Ana Martínez',
        cliente_telefono: '555-0789',
        cliente_direccion: 'Plaza Mayor 789, Ciudad',
        cliente_email: 'ana@email.com',
        fecha_pedido: new Date('2024-01-13T09:15:00'),
        fecha_entrega: new Date('2024-01-14T16:30:00'),
        estado: 'listo',
        total: 65.00,
        metodo_pago: 'efectivo',
        notas: 'Flores para el jardín',
        usuario_id: 4, // Usuario
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        cliente_nombre: 'Luis Pérez',
        cliente_telefono: '555-0321',
        cliente_direccion: 'Calle del Sol 321, Ciudad',
        cliente_email: 'luis@email.com',
        fecha_pedido: new Date('2024-01-12T11:20:00'),
        fecha_entrega: new Date('2024-01-13T10:00:00'),
        estado: 'en_camino',
        total: 95.00,
        metodo_pago: 'transferencia',
        notas: 'Para boda',
        usuario_id: 4, // Usuario
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        cliente_nombre: 'Sofia López',
        cliente_telefono: '555-0654',
        cliente_direccion: 'Avenida Norte 654, Ciudad',
        cliente_email: 'sofia@email.com',
        fecha_pedido: new Date('2024-01-11T14:30:00'),
        fecha_entrega: new Date('2024-01-12T15:00:00'),
        estado: 'entregado',
        total: 75.50,
        metodo_pago: 'efectivo',
        notas: 'Para graduación',
        usuario_id: 4, // Usuario
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        cliente_nombre: 'Roberto Silva',
        cliente_telefono: '555-0987',
        cliente_direccion: 'Calle Sur 987, Ciudad',
        cliente_email: 'roberto@email.com',
        fecha_pedido: new Date('2024-01-10T16:45:00'),
        fecha_entrega: new Date('2024-01-11T13:00:00'),
        estado: 'pendiente',
        total: 150.00,
        metodo_pago: 'tarjeta',
        notas: 'Arreglo grande para evento corporativo',
        usuario_id: 4, // Usuario
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true });

    // Luego crear los detalles de los pedidos
    return queryInterface.bulkInsert('detalles_pedidos', [
      // Detalles del Pedido 1
      {
        pedido_id: 1,
        producto_id: 1, // Rosa Roja
        cantidad: 1,
        precio_unitario: 45.00,
        subtotal: 45.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        pedido_id: 1,
        producto_id: 2, // Rosa Blanca
        cantidad: 1,
        precio_unitario: 40.50,
        subtotal: 40.50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Detalles del Pedido 2
      {
        pedido_id: 2,
        producto_id: 3, // Tulipán Amarillo
        cantidad: 1,
        precio_unitario: 120.00,
        subtotal: 120.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Detalles del Pedido 3
      {
        pedido_id: 3,
        producto_id: 4, // Tulipán Rosa
        cantidad: 1,
        precio_unitario: 35.00,
        subtotal: 35.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        pedido_id: 3,
        producto_id: 5, // Girasol Grande
        cantidad: 1,
        precio_unitario: 30.00,
        subtotal: 30.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Detalles del Pedido 4
      {
        pedido_id: 4,
        producto_id: 6, // Lirio Blanco
        cantidad: 1,
        precio_unitario: 55.00,
        subtotal: 55.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        pedido_id: 4,
        producto_id: 7, // Margarita Blanca
        cantidad: 1,
        precio_unitario: 40.00,
        subtotal: 40.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Detalles del Pedido 5
      {
        pedido_id: 5,
        producto_id: 8, // Orquídea Púrpura
        cantidad: 1,
        precio_unitario: 75.50,
        subtotal: 75.50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Detalles del Pedido 6
      {
        pedido_id: 6,
        producto_id: 9, // Crisantemo Amarillo
        cantidad: 1,
        precio_unitario: 80.00,
        subtotal: 80.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        pedido_id: 6,
        producto_id: 10, // Crisantemo Blanco
        cantidad: 1,
        precio_unitario: 70.00,
        subtotal: 70.00,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('detalles_pedidos', null, {});
    await queryInterface.bulkDelete('pedidos', null, {});
  }
}; 
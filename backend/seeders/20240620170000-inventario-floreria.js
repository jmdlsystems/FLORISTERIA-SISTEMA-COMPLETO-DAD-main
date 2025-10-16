'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('inventarios', [
      {
        id: 1,
        producto_id: 1, // Rosa Roja
        ubicacion_id: 1, // Refrigerador Principal
        cantidad_actual: 50,
        cantidad_minima: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        producto_id: 2, // Rosa Blanca
        ubicacion_id: 1, // Refrigerador Principal
        cantidad_actual: 45,
        cantidad_minima: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        producto_id: 3, // Tulipán Amarillo
        ubicacion_id: 2, // Refrigerador Secundario
        cantidad_actual: 30,
        cantidad_minima: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        producto_id: 4, // Tulipán Rosa
        ubicacion_id: 2, // Refrigerador Secundario
        cantidad_actual: 35,
        cantidad_minima: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        producto_id: 5, // Girasol Grande
        ubicacion_id: 3, // Sala de Exhibición
        cantidad_actual: 25,
        cantidad_minima: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        producto_id: 6, // Lirio Blanco
        ubicacion_id: 9, // Refrigerador de Rosas
        cantidad_actual: 20,
        cantidad_minima: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        producto_id: 7, // Margarita Blanca
        ubicacion_id: 3, // Sala de Exhibición
        cantidad_actual: 40,
        cantidad_minima: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        producto_id: 8, // Orquídea Phalaenopsis
        ubicacion_id: 7, // Invernadero
        cantidad_actual: 8,
        cantidad_minima: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        producto_id: 9, // Crisantemo Amarillo
        ubicacion_id: 3, // Sala de Exhibición
        cantidad_actual: 30,
        cantidad_minima: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        producto_id: 10, // Arreglo Romántico
        ubicacion_id: 3, // Sala de Exhibición
        cantidad_actual: 5,
        cantidad_minima: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        producto_id: 11, // Planta Suculenta
        ubicacion_id: 7, // Invernadero
        cantidad_actual: 15,
        cantidad_minima: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        producto_id: 12, // Lazo Decorativo
        ubicacion_id: 5, // Estantería de Accesorios
        cantidad_actual: 100,
        cantidad_minima: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 13,
        producto_id: 13, // Rosa Rosa
        ubicacion_id: 1, // Refrigerador Principal
        cantidad_actual: 40,
        cantidad_minima: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 14,
        producto_id: 14, // Tulipán Morado
        ubicacion_id: 2, // Refrigerador Secundario
        cantidad_actual: 25,
        cantidad_minima: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 15,
        producto_id: 15, // Girasol Pequeño
        ubicacion_id: 3, // Sala de Exhibición
        cantidad_actual: 35,
        cantidad_minima: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('inventarios', {
      producto_id: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    }, {});
  }
}; 
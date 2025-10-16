'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categorias', [
      {
        id: 1,
        nombre: 'Rosas',
        descripcion: 'Rosas de diferentes colores y variedades',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        nombre: 'Tulipanes',
        descripcion: 'Tulipanes frescos de temporada',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        nombre: 'Girasoles',
        descripcion: 'Girasoles alegres y vibrantes',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        nombre: 'Lirios',
        descripcion: 'Lirios elegantes y fragantes',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        nombre: 'Margaritas',
        descripcion: 'Margaritas blancas y coloridas',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        nombre: 'Orquídeas',
        descripcion: 'Orquídeas exóticas y elegantes',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        nombre: 'Crisantemos',
        descripcion: 'Crisantemos de múltiples colores',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        nombre: 'Arreglos Florales',
        descripcion: 'Arreglos florales combinados',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        nombre: 'Plantas de Interior',
        descripcion: 'Plantas de interior y macetas',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        nombre: 'Accesorios',
        descripcion: 'Lazos, tarjetas y accesorios florales',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categorias', {
      nombre: [
        'Rosas', 'Tulipanes', 'Girasoles', 'Lirios', 'Margaritas',
        'Orquídeas', 'Crisantemos', 'Arreglos Florales', 'Plantas de Interior', 'Accesorios'
      ]
    }, {});
  }
}; 
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ubicaciones', [
      {
        nombre: 'Refrigerador Principal',
        descripcion: 'Refrigerador principal para flores frescas y arreglos florales',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Refrigerador Secundario',
        descripcion: 'Refrigerador adicional para flores de temporada y stock extra',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Sala de Exhibición',
        descripcion: 'Área principal de exhibición para arreglos florales y decoraciones',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Almacén de Macetas',
        descripcion: 'Almacén para macetas, jardineras y contenedores de plantas',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Estantería de Accesorios',
        descripcion: 'Estantería para lazos, cintas, tarjetas y accesorios florales',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Área de Trabajo',
        descripcion: 'Mesa de trabajo para arreglos florales y preparación de pedidos',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Invernadero',
        descripcion: 'Invernadero para plantas vivas y flores en maceta',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Almacén de Suelos',
        descripcion: 'Almacén para sustratos, fertilizantes y tierra para macetas',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Refrigerador de Rosas',
        descripcion: 'Refrigerador especializado para rosas y flores delicadas',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Área de Entrega',
        descripcion: 'Área de preparación y organización de entregas a domicilio',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Estantería de Plantas Artificiales',
        descripcion: 'Estantería para plantas artificiales y flores secas',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Almacén de Herramientas',
        descripcion: 'Almacén para tijeras, alambres, espumas y herramientas de trabajo',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ubicaciones', {
      nombre: [
        'Refrigerador Principal',
        'Refrigerador Secundario',
        'Sala de Exhibición',
        'Almacén de Macetas',
        'Estantería de Accesorios',
        'Área de Trabajo',
        'Invernadero',
        'Almacén de Suelos',
        'Refrigerador de Rosas',
        'Área de Entrega',
        'Estantería de Plantas Artificiales',
        'Almacén de Herramientas'
      ]
    }, {});
  }
}; 
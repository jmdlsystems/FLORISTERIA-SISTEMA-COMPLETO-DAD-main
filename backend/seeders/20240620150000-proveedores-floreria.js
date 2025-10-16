'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('proveedores', [
      {
        id: 1,
        nombre: 'Flores del Valle',
        contacto: 'María González',
        direccion: 'Calle Principal 123, Ciudad Jardín',
        telefono: '+52 55 1234 5678',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        nombre: 'Vivero San Pedro',
        contacto: 'Carlos Mendoza',
        direccion: 'Av. Reforma 456, Centro',
        telefono: '+52 55 9876 5432',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        nombre: 'Invernaderos La Esperanza',
        contacto: 'Ana Rodríguez',
        direccion: 'Carretera Federal 789, Zona Rural',
        telefono: '+52 55 5555 1234',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        nombre: 'Flores Exóticas del Sur',
        contacto: 'Luis Fernández',
        direccion: 'Blvd. Costero 321, Puerto',
        telefono: '+52 55 4444 5678',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        nombre: 'Vivero Los Pinos',
        contacto: 'Patricia López',
        direccion: 'Calle de los Pinos 654, Colonia Jardines',
        telefono: '+52 55 3333 9999',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        nombre: 'Flores de Importación Premium',
        contacto: 'Roberto Silva',
        direccion: 'Zona Industrial 987, Parque Empresarial',
        telefono: '+52 55 2222 8888',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        nombre: 'Vivero El Paraíso',
        contacto: 'Carmen Vega',
        direccion: 'Camino Rural 147, Ejido Verde',
        telefono: '+52 55 1111 7777',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        nombre: 'Flores y Plantas Express',
        contacto: 'Diego Morales',
        direccion: 'Av. Comercial 258, Plaza Mayor',
        telefono: '+52 55 6666 4444',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('proveedores', {
      nombre: [
        'Flores del Valle', 'Vivero San Pedro', 'Invernaderos La Esperanza',
        'Flores Exóticas del Sur', 'Vivero Los Pinos', 'Flores de Importación Premium',
        'Vivero El Paraíso', 'Flores y Plantas Express'
      ]
    }, {});
  }
}; 
'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hash1 = await bcrypt.hash('admin123', 12);
    const hash2 = await bcrypt.hash('usuario123', 12);
    return queryInterface.bulkInsert('usuarios', [
      {
        nombre: 'Administrador',
        correo: 'admin@demo.com',
        contraseña: hash1,
        rol_id: 1, // ADMINISTRADOR
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Repartidor Demo',
        correo: 'repartidor@demo.com',
        contraseña: hash2,
        rol_id: 2, // REPARTIDOR
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Florista Demo',
        correo: 'florista@demo.com',
        contraseña: hash2,
        rol_id: 3, // FLORISTA
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Usuario Demo',
        correo: 'usuario@demo.com',
        contraseña: hash2,
        rol_id: 4, // USUARIO
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('usuarios', {
      correo: ['admin@demo.com', 'repartidor@demo.com', 'florista@demo.com', 'usuario@demo.com']
    }, {});
  }
}; 
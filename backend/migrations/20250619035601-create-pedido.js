'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pedidos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cliente_nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cliente_telefono: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cliente_direccion: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      cliente_email: {
        type: Sequelize.STRING,
        allowNull: true
      },
      fecha_pedido: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      fecha_entrega: {
        type: Sequelize.DATE,
        allowNull: true
      },
      estado: {
        type: Sequelize.ENUM('pendiente', 'en_preparacion', 'listo', 'en_camino', 'entregado', 'cancelado'),
        allowNull: false,
        defaultValue: 'pendiente'
      },
      total: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
        defaultValue: 0.00
      },
      metodo_pago: {
        type: Sequelize.ENUM('efectivo', 'tarjeta', 'transferencia'),
        allowNull: false,
        defaultValue: 'efectivo'
      },
      notas: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'usuarios',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('pedidos');
  }
};
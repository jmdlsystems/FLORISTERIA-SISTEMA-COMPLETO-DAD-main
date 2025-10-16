'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pedido.hasMany(models.Detalle_Pedido, { foreignKey: 'pedido_id', as: 'detalles_pedidos' });
      Pedido.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
    }
  }
  Pedido.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    cliente_nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cliente_telefono: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cliente_direccion: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    cliente_email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fecha_pedido: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    fecha_entrega: {
      type: DataTypes.DATE,
      allowNull: true
    },
    estado: {
      type: DataTypes.ENUM('pendiente', 'en_preparacion', 'listo', 'en_camino', 'entregado', 'cancelado'),
      allowNull: false,
      defaultValue: 'pendiente',
      ...(sequelize.getDialect() === 'mysql' ? { type: DataTypes.ENUM({ values: ['pendiente', 'en_preparacion', 'listo', 'en_camino', 'entregado', 'cancelado'], name: 'estado', } ) } : {})
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    metodo_pago: {
      type: DataTypes.ENUM('efectivo', 'tarjeta', 'transferencia'),
      allowNull: false,
      defaultValue: 'efectivo',
      ...(sequelize.getDialect() === 'mysql' ? { type: DataTypes.ENUM({ values: ['efectivo', 'tarjeta', 'transferencia'], name: 'metodo_pago', } ) } : {})
    },
    notas: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Pedido',
    tableName: 'pedidos',
  });
  return Pedido;
}; 
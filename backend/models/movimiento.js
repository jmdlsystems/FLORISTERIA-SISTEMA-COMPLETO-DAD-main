'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movimiento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Movimiento.belongsTo(models.Producto, { foreignKey: 'producto_id', as: 'producto' });
      Movimiento.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
    }
  }
  Movimiento.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tipo: DataTypes.STRING,
    producto_id: DataTypes.INTEGER,
    cantidad: DataTypes.INTEGER,
    fecha: DataTypes.DATE,
    usuario_id: DataTypes.INTEGER,
    descripcion: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Movimiento',
    tableName: 'movimientos',
  });
  return Movimiento;
};
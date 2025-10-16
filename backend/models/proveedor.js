'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Proveedor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Proveedor.hasMany(models.Producto, { foreignKey: 'proveedor_id', as: 'productos' });
      Proveedor.hasMany(models.Orden_Compra, { foreignKey: 'proveedor_id', as: 'ordenes_compras' });
    }
  }
  Proveedor.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: DataTypes.STRING,
    contacto: DataTypes.STRING,
    direccion: DataTypes.STRING,
    telefono: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Proveedor',
    tableName: 'proveedores',
  });
  return Proveedor;
};
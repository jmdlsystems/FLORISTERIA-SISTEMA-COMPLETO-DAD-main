'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Detalle_Orden_Compra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Detalle_Orden_Compra.belongsTo(models.Orden_Compra, { foreignKey: 'orden_compra_id', as: 'orden_compra' });
      Detalle_Orden_Compra.belongsTo(models.Producto, { foreignKey: 'producto_id', as: 'producto' });
    }
  }
  Detalle_Orden_Compra.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    orden_compra_id: DataTypes.INTEGER,
    producto_id: DataTypes.INTEGER,
    cantidad: DataTypes.INTEGER,
    precio_unitario: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Detalle_Orden_Compra',
    tableName: 'detalles_ordenes_compras',
  });
  return Detalle_Orden_Compra;
};
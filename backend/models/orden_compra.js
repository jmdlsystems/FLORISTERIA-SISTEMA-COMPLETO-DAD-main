'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orden_Compra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Orden_Compra.belongsTo(models.Proveedor, { foreignKey: 'proveedor_id', as: 'proveedor' });
      Orden_Compra.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
      Orden_Compra.hasMany(models.Detalle_Orden_Compra, { foreignKey: 'orden_compra_id', as: 'detalles_ordenes_compras' });
    }
  }
  Orden_Compra.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    proveedor_id: DataTypes.INTEGER,
    fecha: DataTypes.DATE,
    estado: DataTypes.STRING,
    usuario_id: DataTypes.INTEGER,
    numero: DataTypes.STRING,
    total: DataTypes.DECIMAL(10,2)
  }, {
    sequelize,
    modelName: 'Orden_Compra',
    tableName: 'ordenes_compras',
  });
  return Orden_Compra;
};
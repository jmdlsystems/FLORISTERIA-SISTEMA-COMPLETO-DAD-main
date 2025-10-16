'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inventario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Inventario.belongsTo(models.Producto, { foreignKey: 'producto_id', as: 'producto' });
      Inventario.belongsTo(models.Ubicacion, { foreignKey: 'ubicacion_id', as: 'ubicacion' });
    }
  }
  Inventario.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    producto_id: DataTypes.INTEGER,
    cantidad_actual: DataTypes.INTEGER,
    cantidad_minima: DataTypes.INTEGER,
    ubicacion_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Inventario',
    tableName: 'inventarios',
  });
  return Inventario;
};
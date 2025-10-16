'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ajuste_Inventario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Ajuste_Inventario.belongsTo(models.Producto, { foreignKey: 'producto_id', as: 'producto' });
      Ajuste_Inventario.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
    }
  }
  Ajuste_Inventario.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    producto_id: DataTypes.INTEGER,
    cantidad_ajustada: DataTypes.INTEGER,
    motivo: DataTypes.STRING,
    fecha: DataTypes.DATE,
    usuario_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Ajuste_Inventario',
    tableName: 'ajustes_inventarios',
  });
  return Ajuste_Inventario;
};
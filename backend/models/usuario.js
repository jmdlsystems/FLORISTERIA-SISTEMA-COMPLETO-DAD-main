'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Usuario.belongsTo(models.Rol, { foreignKey: 'rol_id', as: 'rol' });
      Usuario.hasMany(models.Movimiento, { foreignKey: 'usuario_id', as: 'movimientos' });
      Usuario.hasMany(models.Orden_Compra, { foreignKey: 'usuario_id', as: 'ordenes_compras' });
      Usuario.hasMany(models.Ajuste_Inventario, { foreignKey: 'usuario_id', as: 'ajustes_inventarios' });
    }
  }
  Usuario.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: DataTypes.STRING,
    correo: DataTypes.STRING,
    contraseña: DataTypes.STRING,
    rol_id: DataTypes.INTEGER,
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuarios',
  });
  return Usuario;
};
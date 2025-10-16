'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Producto.belongsTo(models.Categoria, { foreignKey: 'categoria_id', as: 'categoria' });
      Producto.belongsTo(models.Proveedor, { foreignKey: 'proveedor_id', as: 'proveedor' });
      Producto.hasMany(models.Inventario, { foreignKey: 'producto_id', as: 'inventarios' });
      Producto.hasMany(models.Movimiento, { foreignKey: 'producto_id', as: 'movimientos' });
      Producto.hasMany(models.Detalle_Orden_Compra, { foreignKey: 'producto_id', as: 'detalles_ordenes_compras' });
      Producto.hasMany(models.Ajuste_Inventario, { foreignKey: 'producto_id', as: 'ajustes_inventarios' });
    }
  }
  Producto.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: true
    },
    descripcion: DataTypes.STRING,
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0.00
    },
    categoria_id: DataTypes.INTEGER,
    proveedor_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Producto',
    tableName: 'productos',
  });
  return Producto;
};
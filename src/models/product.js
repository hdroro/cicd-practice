'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    static associate(models) {
      product.belongsTo(models.category, {
        foreignKey: 'categoryId'
      });
    }
  }
  product.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    categoryId: DataTypes.STRING,
    price: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};
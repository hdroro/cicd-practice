'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      
    }
  }
  user.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    tokenLogin: DataTypes.STRING,
    provideId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};
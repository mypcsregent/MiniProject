'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class issuebooks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  issuebooks.init({
    isbn: DataTypes.STRING,
    emailid: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'issuebooks',
  });
  return issuebooks;
};
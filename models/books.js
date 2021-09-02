'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  books.init({
    isbn: DataTypes.STRING,
    book_name: DataTypes.STRING,
    author: DataTypes.STRING,
    total_count: DataTypes.INTEGER,
    available_count: DataTypes.INTEGER,
    published_date: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'books',
  });
  return books;
};
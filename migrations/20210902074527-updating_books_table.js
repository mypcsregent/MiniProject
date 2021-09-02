'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.dropTable('books');
     await queryInterface.createTable('books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      isbn: {
        type: Sequelize.STRING,
        unique:true
      },
      book_name: {
        type: Sequelize.STRING
      },
      author: {
        type: Sequelize.STRING
      },
      total_count: {
        type: Sequelize.INTEGER
      },
      available_count: {
        type: Sequelize.INTEGER
      },
      published_year: {
        type: Sequelize.INTEGER
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable('books');
  }
};

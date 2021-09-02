'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

     await queryInterface.bulkInsert('users', [{
       username:"Rajesh",
       emailid:"rajesh@gmail.com",
       password:"Password121*"
     },
     {
      username:"Harry",
      emailid:"Harry@gmail.com",
      password:"Passwordss121*"
    },
    {
      username:"DJ sharma",
      emailid:"sharma.DJ@gmail.com",
      password:"DJPassword121*"
    }
    
    
    ],{});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('users', [{
       emailid:"sharma.DJ@gmail.com"
     },
    {
      emailid:"Harry@gmail.com"
    },
    {
    emailid:"rajesh@gmail.com"
    }], {});
  }
};

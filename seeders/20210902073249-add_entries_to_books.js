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

     await queryInterface.bulkInsert('books', [{
         isbn:'B_121',
         book_name:'Fundamentals of python',
         author: 'Sumita Arora',
         total_count:50,
         available_count:50,
         published_year:2005, 
       },
       {
        isbn:'B_122',
        book_name:'Fundamentals of computers',
        author: 'Sumita Arora',
        total_count:50,
        available_count:50,
        published_year:2007, 
      },
      {
        isbn:'B_123',
        book_name:'Fundamentals of mathematics',
        author: 'R.D. Sharma',
        total_count:50,
        available_count:50,
        published_year:2015, 
      }
      
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

     await queryInterface.bulkDelete('books', [{
       isbn:'B_121'
     },
    {
      isbn:'B_122'
    }], {});
  }
};

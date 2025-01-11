'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      {
        name: 'Dresses',
        description: 'The description for Dresses',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Hats',
        description: 'The description for Hats',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Coats',
        description: 'The description for Coats',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};

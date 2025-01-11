'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', [
      {
        title: 'Essence Mascara Lash Princess',
        description: 'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects.',
        categoryId: 1,
        price: 9.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Hat havana',
        description: 'Hat in havana brand is a popular mascara known for its volumizing and lengthening effects.',
        categoryId: 2,
        price: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Warm coat',
        description: 'The Coat is a popular mascara known for its volumizing and lengthening effects.',
        categoryId: 3,
        price: 19.99,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};

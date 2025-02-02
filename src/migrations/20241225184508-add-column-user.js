'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'tokenLogin', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('users', 'provideId', {
      type: Sequelize.STRING,
    });

    await queryInterface.changeColumn('users', 'password', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'tokenLogin');
    await queryInterface.removeColumn('users', 'provideId');
    await queryInterface.changeColumn('users', 'password', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};

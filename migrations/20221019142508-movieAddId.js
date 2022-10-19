'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Movies', 'id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Movies', 'id');
  }
};

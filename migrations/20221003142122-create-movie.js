'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Movies', {
      Codigo: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      Titulo: {
        type: Sequelize.STRING
      },
      Stock: {
        type: Sequelize.INTEGER
      },
      CantidadDeAlquileres: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Movies');
  }
};
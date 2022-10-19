'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('rents', {
      id_rent: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      id_film: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      rent_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      refund_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      userRefund_date: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('rents');
  }
};
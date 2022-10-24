"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("FavouriteFilms", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      MovieCode: {
        type: Sequelize.STRING,
        allowNull: false,
        foreignKey: true,
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
      },
      review: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("FavouriteFilms");
  },
};

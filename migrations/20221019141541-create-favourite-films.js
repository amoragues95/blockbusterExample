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
      id_film: {
        type: Sequelize.INTEGER,
      },
      id_user: {
        type: Sequelize.INTEGER,
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

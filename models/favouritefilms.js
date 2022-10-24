"use strict";
const db = require('../models/index');
const { User, Movie } = db;
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class FavouriteFilms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // FavouriteFilms.hasMany(models.Movie, {
      //   foreignKey: "code",
      //   target_key: "id_film",
      // });
      // FavouriteFilms.hasMany(models.User, {
      //   foreignKey: "id",
      //   target_key: "id_user",
      // });
    }
  }
  FavouriteFilms.init(
    {
      id_film: {
        type: DataTypes.INTEGER,
        references: {
          model: Movie,
          key: "id",
        },
      },
      id_user: {
        type: DataTypes.INTEGER,
        references: {
          model: User,
          key: "id",
        },
      },
      review: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "FavouriteFilms",
    }
  );
  return FavouriteFilms;
};

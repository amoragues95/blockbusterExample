"use strict";
//const db = require('./index');
//const { User, Movie } = db;
const { User } = require ('./user')
const { Movie } = require ('./movie')
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
      FavouriteFilms.hasMany(models.Movie, {
        foreignKey: "code",
        target_key: "code",
      });
      FavouriteFilms.hasMany(models.User, {
        foreignKey: "id",
        target_key: "id_user",
      });
    }
  }
  FavouriteFilms.init(
    {
      MovieCode: {
        type: DataTypes.INTEGER,
        references: {
          model: Movie,
          key: "id",
        },
      },
      UserId: {
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

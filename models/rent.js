"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //n to n with user and film
      Rent.belongsTo(models.User, {
        foreignKey: "id_user",
        as: "user",
      });
      Rent.belongsTo(models.Movie, {
        foreignKey: "code",
        as: "film",
      });
    }
  }
  Rent.init(
    {
      id_Rent: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        foreignKey: true,
      },
      Rent_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      refund_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      userRefund_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Rent",
    }
  );
  return Rent;
};

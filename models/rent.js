"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class rent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //n to n with user and film
      rent.belongsTo(models.user, {
        foreignKey: "id_user",
        as: "user",
      });
      rent.belongsTo(models.movie, {
        foreignKey: "code",
        as: "film",
      });
    }
  }
  rent.init(
    {
      id_rent: {
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
      rent_date: {
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
      modelName: "rent",
    }
  );
  return rent;
};

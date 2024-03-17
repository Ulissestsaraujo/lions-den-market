const { DataTypes } = require("sequelize");
const { dbConnection } = require("./db");

const Coupon = dbConnection.define("Coupon", {
  coupon_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  coupon_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  discount_amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  valid_from: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  valid_until: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = { Coupon };

const { DataTypes } = require("sequelize");
const { dbConnection } = require("./db");
const { Order } = require("./order");

const Payment = dbConnection.define("Payment", {
  payment_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  payment_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  payment_method: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  transaction_id: {
    type: DataTypes.STRING,
  },
});


module.exports = { Payment };

const { DataTypes } = require("sequelize");
const { dbConnection } = require("./db"); // Assuming you have configured your Sequelize instance

const OrderItem = dbConnection.define("OrderItem", {
  order_item_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price_per_unit: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  subtotal: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = { OrderItem };

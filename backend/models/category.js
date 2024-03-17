const { DataTypes } = require("sequelize");
const { dbConnection } = require("./db");

const Category = dbConnection.define("Category", {
  category_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = {
  Category,
};

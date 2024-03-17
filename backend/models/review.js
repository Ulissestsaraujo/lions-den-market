const { DataTypes } = require("sequelize");
const { dbConnection } = require("./db");
const User = require("./user");
const { Product } = require("./product");

const Review = dbConnection.define("Review", {
  review_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  review_text: {
    type: DataTypes.TEXT,
  },
  review_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

User.hasMany(Review, { foreignKey: "user_id" });
Product.hasMany(Review, { foreignKey: "product_id" });
Review.belongsTo(User, { foreignKey: "user_id" });
Review.belongsTo(Product, { foreignKey: "product_id" });

module.exports = Review;

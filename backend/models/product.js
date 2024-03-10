const { DataTypes } = require("sequelize");
const { dbConnection } = require("./db");

// Define your Product model
const Product = dbConnection.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.TEXT,
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  discount_percentage: DataTypes.DECIMAL(5, 2),
  rating: DataTypes.DECIMAL(3, 2),
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  thumbnail: DataTypes.TEXT,
});

// Define your ProductImage model
const ProductImage = dbConnection.define("ProductImage", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

// Define the association between Product and ProductImage
Product.hasMany(ProductImage, { foreignKey: "product_id" });
ProductImage.belongsTo(Product, { foreignKey: "product_id" });

// Export your models
module.exports = {
  Product,
  ProductImage,
};

const { DataTypes } = require("sequelize");
const { dbConnection } = require("./db");
const { Category } = require("./category");
const { OrderItem } = require("./orderItems");

const Product = dbConnection.define(
  "Product",
  {
    product_id: {
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
    thumbnail: DataTypes.TEXT,
  },
  {
    tableName: "Products",
  }
);

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

Product.hasMany(ProductImage, { foreignKey: "product_id" });
ProductImage.belongsTo(Product, { foreignKey: "product_id" });

Product.belongsTo(Category, { foreignKey: "category_id" });
Category.hasMany(Product, { foreignKey: "category_id" });

Product.hasMany(OrderItem, { foreignKey: "product_id" });
OrderItem.belongsTo(Product, { foreignKey: "product_id" });

module.exports = {
  Product,
  ProductImage,
};

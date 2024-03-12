const { Product, ProductImage } = require("../models/product");

const getAllProducts = async () => {
  return await Product.findAll();
};

const getProductById = async (id) => {
  return await Product.findOne({ include: ProductImage, where: { id: id } });
};

module.exports = { getAllProducts, getProductById };

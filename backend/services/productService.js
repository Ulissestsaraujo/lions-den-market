const { Product, ProductImage } = require("../models/product");

const getAllProducts = async () => {
  return await Product.findAll({ include: ProductImage });
};

module.exports = { getAllProducts };

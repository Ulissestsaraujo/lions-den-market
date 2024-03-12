const productService = require("../services/productService");

const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await productService.getProductById(productId);
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getProductById,
  getAllProducts,
};

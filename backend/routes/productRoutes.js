const express = require("express");
const router = express.Router();
const productService = require("../services/productService");

// Define routes
router.get("/", async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Define other routes if needed

module.exports = router;

const express = require("express");
const {
  getAllProducts,
  getProductById,
} = require("../controllers/productController");
const router = express.Router();

// Define routes
router.get("/", getAllProducts);

router.get("/:id", getProductById);

// Define other routes if needed

module.exports = router;

const express = require("express");
const {
  getAllProducts,
  getProductById,
  createProduct,
} = require("../controllers/productController");
const { authenticate } = require("../utils/authenticationMiddleware");
const router = express.Router();

router.use(authenticate)
// Define routes
router.get("/", getAllProducts);

router.post("/", createProduct)

router.get("/:id", getProductById);

// Define other routes if needed

module.exports = router;

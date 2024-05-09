const express = require("express");
const {
  register,
  login,
  changePassword,
} = require("../controllers/userController");
const router = express.Router();

const { uploadMiddleware } = require("../utils/uploadImagesMiddleware");

// Define routes
router.post("/register", uploadMiddleware.single("images"), register);

router.post("/login", login);

router.put("/changePassword", changePassword);

// Define other routes if needed

module.exports = router;

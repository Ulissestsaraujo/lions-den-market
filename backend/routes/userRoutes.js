const express = require("express");
const {
  register,
  login,
  changePassword,
} = require("../controllers/userController");
const router = express.Router();

// Define routes
router.post("/register", register);

router.post("/login", login);

router.put("/changePassword", changePassword);

// Define other routes if needed

module.exports = router;

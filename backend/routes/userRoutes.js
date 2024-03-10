const express = require("express");
const { register, login } = require("../controllers/userController");
const router = express.Router();

// Define routes
router.post("/register", register);

router.post("/login", login);

// Define other routes if needed

module.exports = router;

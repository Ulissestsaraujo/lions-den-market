const userService = require("../services/userService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "24h" });
};

// Function to verify JWT token
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Change this to the same secret used to sign the token
    return decoded.userId;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
};

const comparePassword = async (plainPassword, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);

    return isMatch;
  } catch (error) {
    console.error("Error comparing password:", error);
    throw error;
  }
};
const register = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const user = await userService.createUser({ email, password, username });
    res.json(user);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.findUserByEmail(email);
    if (!user || !comparePassword(password, user.password)) {
      res.status(401).json({ error: "invalid email or password" });
    }

    const token = generateToken(user.id);
    res.json({ token });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { register, login };

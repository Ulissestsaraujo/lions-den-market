const bcrypt = require("bcrypt");
const { User } = require("../models/user");

const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
};

const createUser = async (user) => {
  const hashedPassword = await hashPassword(user.password);
  const newUser = await User.create({ ...user, password: hashedPassword });
  return newUser.id;
};

const findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

const findUserById = async (id) => {
  return await User.findOne({ where: { id } });
};

const updatePassword = async (user) => {
  const existingUser = await findUserByEmail(user.email);
  const hashedPassword = await hashPassword(user.password);
  await existingUser.update({ ...user, password: hashedPassword });
};

module.exports = {
  createUser,
  findUserByEmail,
  updatePassword,
  findUserById
};

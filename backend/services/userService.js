const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const { Image } = require("../models/image");

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

const createUser = async (user, profilePic) => {
  try {
    if (profilePic) {
      const hashedPassword = await hashPassword(user.password);
      const newUser = await User.create({ ...user, password: hashedPassword });
      const { path } = profilePic;
      await Image.create({ url: path, user_id: newUser.id });
      return newUser.id;
    }
    return;
  } catch (error) {
    console.error(error);
  }
};

const findUserByEmail = async (email) => {
  return await User.findOne({ where: { email }, include: Image });
};

const findUserById = async (id) => {
  return await User.findOne({ where: { id }, include: Image });
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
  findUserById,
};

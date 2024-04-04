const { Job } = require("../models/job");

const getAllProducts = async () => {
  return await Job.findAll();
};

const getProductById = async (id) => {
  return await Job.findOne({ where: { id: id } });
};

const createProduct = async (job, userId) => {
  const newUser = await Job.create({ ...job, owner_user_id: userId });
  return newUser.id;
};

module.exports = { getAllProducts, getProductById, createProduct };

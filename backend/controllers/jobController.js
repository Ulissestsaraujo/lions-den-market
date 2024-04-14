const jobService = require("../services/jobService");

const getAllJobs = async (req, res) => {
  try {
    const products = await jobService.getAllJobs();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createJobAndUploadFiles = async (req, res) => {
  try {
    const files = req.files;
    const { price, description, title, status } = req.body;
    const job = await jobService.createJobAndUploadFiles(
      { price, description, title, status },
      files,
      req.user.id
    );
    res.json(job);
  } catch (error) {
    console.error("Error creating products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getJobById = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await jobService.getJobById(productId);
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const userId = req.user.id;
    const fieldsToUpdate = req.body;
    await jobService.updateJob(jobId, fieldsToUpdate, userId);

    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const userId = req.user.id;

    await jobService.deleteJob(jobId, userId);

    res.status(200).send();
  } catch (error) {
    console.error("Error deleting:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getJobById,
  getAllJobs,
  createJobAndUploadFiles,
  updateJob,
  deleteJob,
};

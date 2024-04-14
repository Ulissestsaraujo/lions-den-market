const express = require("express");
const path = require("path");
const {
  getAllJobs,
  getJobById,
  createJobAndUploadFiles,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");
const { authenticate } = require("../utils/authenticationMiddleware");
const { uploadMiddleware } = require("../utils/uploadImagesMiddleware");
const router = express.Router();

router.get("/", getAllJobs);

router.get("/:id", getJobById);

router.use(authenticate);

router.post("/", uploadMiddleware.array("images", 5), createJobAndUploadFiles);

router.put("/:jobId", updateJob);

router.delete("/:jobId", deleteJob);

module.exports = router;

const express = require("express");
const path = require("path")
const {
  getAllJobs,
  getJobById,
  createJob,

} = require("../controllers/jobController");
const { authenticate } = require("../utils/authenticationMiddleware");
const { uploadFiles } = require("../services/jobService");
const { uploadMiddleware } = require("../utils/uploadImagesMiddleware");
const router = express.Router();


router.get("/", getAllJobs);




router.post("/", createJob)

router.get("/:id", getJobById);

router.post("/:jobId/images", uploadMiddleware.array('images', 5), uploadFiles);


module.exports = router;

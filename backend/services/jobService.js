const { Job, Image } = require("../models/job");

const getAllJobs = async () => {
  return await Job.findAll({ include: Image });
};

const getJobById = async (id) => {
  return await Job.findOne({
    where: { id: id },
    attributes: { exclude: ["owner_user_id"] },
  });
};

const createJob = async (job, userId) => {
  const newUser = await Job.create({ ...job, owner_user_id: userId });
  return newUser.id;
};

const uploadFiles = async (req, res) => {
  console.log("hi");
  try {
    const jobId = req.params.jobId;
    const files = req.files;

    console.log(req.files);

    const images = await Promise.all(
      files.map(async (file) => {
        const { path } = file;
        console.log(path);
        return await Image.create({ url: path, job_id: jobId });
      })
    );
    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error uploading images" });
  }
};

const updateJob = async (jobId, fieldsToUpdate, userId) => {
  try {
    const job = await Job.findByPk(jobId);

    if (!job) {
      console.log("job not found");
      throw new Error("Job not found");
    }

    if (job.owner_user_id !== userId) {
      throw new Error("Unauthorized");
    }

    Object.assign(job, fieldsToUpdate);

    await job.save();
  } catch (error) {
    console.error("error updating job:", error);
    throw error;
  }
};

const deleteJob = async (jobId, userId) => {
  const job = await Job.findByPk(jobId);

  if (!job) {
    console.log("job not found");
    throw new Error("Job not found");
  }

  if (job.owner_user_id !== userId) {
    throw new Error("Unauthorized");
  }
  await job.destroy();
};

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  uploadFiles,
  updateJob,
  deleteJob,
};

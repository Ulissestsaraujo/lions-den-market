const { Job } = require("../models/job");
const { Image } = require("../models/image");
const { User } = require("../models/user");

const getAllJobs = async () => {
  return await Job.findAll({ include: Image });
};

const getJobById = async (id) => {
  return await Job.findOne({
    where: { job_id: id },
    attributes: { exclude: ["owner_user_id"] },
    include: [
      Image,
      {
        model: User,
        attributes: ["username"],
        include: Image,
      },
    ],
  });
};

const createJob = async (job, userId) => {
  const newJob = await Job.create({
    ...job,
    owner_user_id: userId,
    status: "OPEN",
  });
  return newJob.job_id;
};

const createJobAndUploadFiles = async (job, files, userId) => {
  try {
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const jobId = await createJob(job, userId);
    await Promise.all(
      files.map(async (file) => {
        const { path } = file;
        return await Image.create({ url: path, job_id: jobId });
      })
    );
  } catch (error) {
    console.error(error);
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
  createJobAndUploadFiles,
  updateJob,
  deleteJob,
};

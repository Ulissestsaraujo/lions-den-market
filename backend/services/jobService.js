const { Job, Image } = require("../models/job");




const getAllJobs = async () => {
  return await Job.findAll({ include: Image });
};

const getJobById = async (id) => {
  return await Job.findOne({ where: { id: id } });
};

const createJob = async (job, userId) => {
  const newUser = await Job.create({ ...job, owner_user_id: userId });
  return newUser.id;
};

const uploadFiles = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const files = req.files;

    console.log(req.files)

    const images = await Promise.all(files.map(async (file) => {
      const { path } = file;
      console.log(path)
      return await Image.create({ url: path, job_id: jobId });
    }));
    res.json(images)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error uploading images' })
  }
}



module.exports = { getAllJobs, getJobById, createJob, uploadFiles };

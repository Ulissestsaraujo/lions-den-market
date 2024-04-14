import axios from "axios";

export const getAllJobs = async () => {
  return await axios.get("jobs");
};

export const createJob = async (formData: FormData) => {
  await axios.post(`/jobs/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
};

export const getJob = async (jobId: string) => {
  return await axios.get("jobs/" + jobId);
};

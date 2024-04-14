import React, { useEffect, useState } from "react";
import { getAllJobs } from "../../utils/jobsAgent";
import { Job } from "../../types/Job";
import PostCard from "./parts/PostCard";

const Home = (): JSX.Element => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    getAllJobs()
      .then((res) => {
        setJobs(res.data);
      })
      .catch((error) => {
        console.error("Error fetching jobs:" + error);
      });
  }, []);
  return (
    <div className="bg-details grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {jobs.map((job) => (
        <div key={job.job_id} className="w-full h-full">
          <PostCard
            title={job.title}
            description={job.description}
            price={job.price}
            date={job.updatedAt}
            images={job.Images}
            id={job.job_id}
          />
        </div>
      ))}
    </div>
  );
};

export default Home;

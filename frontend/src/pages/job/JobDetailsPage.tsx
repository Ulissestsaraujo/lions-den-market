import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams to access route parameters
import ImageCarousel from "../../components/ImageCarousel";
import { Job } from "../../types/Job";
import { getJob } from "../../utils/jobsAgent";

const JobDetailsPage: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>(); // Extract jobId from route parameters
  const [job, setJob] = useState<Job | undefined>(undefined);

  useEffect(() => {
    if (jobId) {
      getJob(jobId)
        .then((res) => {
          console.log(res.data);
          setJob(res.data);
        })
        .catch((error) => {
          console.error("Error fetching jobs:" + error);
        });
    }
  }, [jobId]);

  if (!job) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto bg-white shadow-md">
      <div className="max-w-6xl mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left side: Job title and description */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
            <p className="text-lg text-gray-700 overflow-auto whitespace-break-spaces">
              {job.description}
            </p>
          </div>
          {/* Right side: Price, created date, and updated date */}
          <div className="flex flex-col justify-between">
            <div className="mb-4">
              <div className="text-lg font-bold mb-2">Price:</div>
              <div>{job.price}</div>
            </div>
            <div className="mb-4">
              <div className="text-lg font-bold mb-2">Created Date:</div>
              <div>{job.createdAt}</div>
            </div>
            <div className="mb-4">
              <div className="text-lg font-bold mb-2">Updated Date:</div>
              <div>{job.updatedAt}</div>
            </div>
          </div>
        </div>
        {/* Image carousel */}
        <div className="mt-8">
          <ImageCarousel images={job.Images} />
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;

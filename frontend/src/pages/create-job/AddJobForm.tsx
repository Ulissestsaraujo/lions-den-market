import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createJob } from "../../utils/jobsAgent";

interface AddJobFormData {
  title: string;
  price: number;
  description: string;
}

const AddJobForm = () => {
  const { register, handleSubmit } = useForm<AddJobFormData>();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const selectedFilesArray = Array.from(files).slice(0, 5); // Limit to first 5 files
      setSelectedFiles(selectedFilesArray.concat(selectedFiles).slice(0, 5));
    }
  };

  const onSubmit = async (data: AddJobFormData) => {
    try {
      const { title, price, description } = data;
      const formData = new FormData();
      formData.append("title", title);
      formData.append("price", price.toString());
      formData.append("description", description);
      selectedFiles.forEach((file) => {
        formData.append("images", file);
      });

      await createJob(formData);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-details shadow-md rounded-md">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          {...register("title", { required: true })}
          className="mb-4 p-2 border border-gray-300 rounded-md"
        />
        <input
          type="number"
          placeholder="Price"
          {...register("price", { required: true })}
          className="mb-4 p-2 border border-gray-300 rounded-md"
        />
        <textarea
          placeholder="Description"
          {...register("description", { required: true })}
          className="mb-4 p-2 border border-gray-300 rounded-md"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          multiple
          className="mb-4"
        />
        {selectedFiles.length > 0 && (
          <div>
            <p>Selected Files:</p>
            <ul>
              {selectedFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
        <button
          type="submit"
          disabled={selectedFiles.length === 0}
          className="submit-button text-text py-2 px-4 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default AddJobForm;

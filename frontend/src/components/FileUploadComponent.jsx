import React, { useState } from "react";
import axios from "axios";

const FileUploadComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("images", selectedFile);
      const jobId = 3;

      await axios.post(`/jobs/${jobId}/images`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer ",
        },
      });

      // Handle successful upload
      console.log("File uploaded successfully");
    } catch (error) {
      // Handle upload error
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        disabled={!selectedFile}
        className="bg-blue-500 text-white py-2 px-4 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Upload
      </button>
    </div>
  );
};

export default FileUploadComponent;

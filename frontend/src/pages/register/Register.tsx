import React, { ChangeEvent, useState } from "react";
import "../pages.css";
import { useForm } from "react-hook-form";
import { registerUser } from "../../utils/usersAgent";

type RegisterFormData = {
  password: string;
  confirmPassword: string;
  username: string;
  email: string;
};

const Register = () => {
  const [file, setFile] = useState<File>();
  const { handleSubmit, register, getValues } = useForm<RegisterFormData>();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const { username, email, password } = data;
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      if (file) {
        formData.append("images", file);
      }

      await registerUser(formData);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };
  function handleFileChange(event: ChangeEvent<HTMLInputElement>): void {
    const files = event.target.files;
    if (files) {
      setFile(files[0]);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-8 bg-details shadow-lg rounded-md">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            {...register("email", { required: true })}
            type="email"
            id="email"
            className="text-input"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            {...register("username", { required: true })}
            className="text-input"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password", { required: true })}
            className="text-input"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: true,
              validate: (val) =>
                getValues("password") === val
                  ? undefined
                  : "Passwords must match",
            })}
            className="text-input"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="profilePicture" className="block text-gray-700">
            Profile Picture
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            multiple
            className="mb-4"
          />
        </div>

        <button type="submit" className="submit-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;

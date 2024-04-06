import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

interface ILoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormData>();

  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = (data: ILoginFormData) => {
    axios
      .post("user/login", data)
      .then((res) => {
        const token = res.data.token;

        localStorage.setItem("token", token);
        setSuccessMessage("Success! You are now logged in.");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm">
        <div className="mb-4">
          <label className="block mb-1" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { required: "Email is required" })}
            className="border border-gray-400 rounded w-full py-2 px-3"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password", { required: "Password is required" })}
            className="border border-gray-400 rounded w-full py-2 px-3"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600"
        >
          Login
        </button>
        {successMessage && (
          <p className="text-red-500 text-sm mt-1">{successMessage}</p>
        )}
      </form>
    </div>
  );
};

export default Login;

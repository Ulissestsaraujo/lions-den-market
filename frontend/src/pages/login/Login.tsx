import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import "../pages.css";

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
    <div className="max-w-md mx-auto mt-8 p-8 bg-details shadow-md rounded-md ">
      <h2 className="text-2xl text-text font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm">
        <div className="mb-4">
          <label className="block mb-1 text-text" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { required: "Email is required" })}
            className="text-input"
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
            className="text-input"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <button type="submit" className="submit-button">
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

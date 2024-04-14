import React from "react";
import "./styles/tailwind.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import NavBar from "./components/Navbar";
import Home from "./pages/home/Home";
import AddJobForm from "./pages/create-job/AddJobForm";
import JobDetailsPage from "./pages/job/JobDetailsPage";

function App(): JSX.Element {
  return (
    <div className="bg-details h-full">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-job" element={<AddJobForm />} />
          <Route path="/jobs/:jobId" element={<JobDetailsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

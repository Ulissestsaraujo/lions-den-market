import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const NavBar = () => {
  const isLoggedIn = useMemo(() => {
    const token = localStorage.getItem("token");
    if (token) {
      return true;
    }
    return false;
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
  };

  return (
    <div className="bg-background text-white py-2">
      <nav className="flex justify-between items-center bg-background text-white px-8">
        <div className="flex items-center">
          <Link to="/" className="text-lg ">
            <img className="h-32 inline" src={logo} alt="Logo" />
            <span>Lion's Den Market</span>
          </Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </li>
          {!isLoggedIn && (
            <>
              <li>
                <Link to="/login" className="hover:underline">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:underline">
                  Register
                </Link>
              </li>
            </>
          )}
          {isLoggedIn && (
            <>
              <li>
                <Link to="/create-job" className="hover:underline">
                  Create Job
                </Link>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;

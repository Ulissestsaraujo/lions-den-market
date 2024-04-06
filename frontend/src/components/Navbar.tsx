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
    <div className="bg-gray-800 text-white py-4">
      <nav className="flex justify-between items-center bg-gray-800 text-white py-4 px-8">
        <div className="flex items-center">
          <img className="h-16 mr-2 bg-white" src={logo} alt="Logo" />
          <Link to="/" className="text-lg font-bold">
            Lion's Den Market
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
          {isLoggedIn && <button onClick={logout}>Logout</button>}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;

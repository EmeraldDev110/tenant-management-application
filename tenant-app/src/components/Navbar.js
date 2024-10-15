import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ setAuthenticated }) {
  // Receive setAuthenticated from props
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Get the username from localStorage
  const username = localStorage.getItem("username") || "User";

  const handleLogout = () => {
    // Remove token and username from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    // Update the authenticated state to false
    setAuthenticated(false);

    // Redirect to login
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          {/* Left Side - Logo and Links */}
          <div className="flex space-x-4">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              Tenant App
            </Link>
            <Link
              to="/orders"
              className="text-lg text-gray-600 hover:text-blue-600"
            >
              Orders
            </Link>
            <Link
              to="/invoices"
              className="text-lg text-gray-600 hover:text-blue-600"
            >
              Invoices
            </Link>
          </div>

          {/* Right Side - User Dropdown */}
          <div className="relative">
            <button
              className="flex items-center space-x-2 focus:outline-none"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span className="text-lg text-gray-600">{username}</span>
              <svg
                className={`w-5 h-5 transition-transform ${
                  dropdownOpen ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

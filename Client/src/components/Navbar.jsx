import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import Cookies from "js-cookie"; // Import js-cookie

const Navbar = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Function to handle logout
  const handleLogout = () => {
    Cookies.remove("authToken"); // Remove the token from cookies
    Cookies.remove("Id"); // Remove the token from cookies
    Cookies.remove("isAdmin"); // Remove the token from cookies
    navigate("/signin"); // Redirect to the /signin page
  };

  // Check if the token exists to determine if the user is authenticated
  const token = Cookies.get("authToken");
  const isAdmin = Cookies.get("isAdmin");

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {isAdmin === "1" ? (
              <>
                <li>
                  <Link to="/weather">Check weather</Link>
                </li>
                <li>
                  <Link to="/history">History</Link>
                </li>
              </>
            ) : (
              <li>
                <Link to="/weather">Check weather</Link>
              </li>
            )}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          Om Weather
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {isAdmin === "1" ? (
            <>
              <li>
                <Link to="/weather">Check weather</Link>
              </li>
              <li>
                <Link to="/history">Weather Reports</Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/weather">Check weather</Link>
            </li>
          )}
        </ul>
      </div>
      <div className="navbar-end">
        {/* Conditional rendering based on the presence of the token */}
        {!token ? (
          <>
            <Link to="/signin" className="btn mr-2">
              Sign In
            </Link>
            <Link to="/signup" className="btn">
              Sign Up
            </Link>
          </>
        ) : (
          <button onClick={handleLogout} className="btn mr-2">
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;

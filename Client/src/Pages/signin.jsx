import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when starting the API call

    try {
      // Sending POST request with email and password in the request body
      const response = await axios.post(`http://localhost:5000/api/auth/login`, {
        email,
        password,
      });

      if (response.status === 200 && response.data.token) {
        // Store the token in the cookie with a 1-hour expiration
        Cookies.set("authToken", response.data.token, { expires: 1 });
        Cookies.set("Id", response.data.user.id, { expires: 1 });
        Cookies.set("isAdmin", response.data.user.isAdmin, { expires: 1 });

        // Handle successful login (e.g., redirect or show success message)
        console.log("Login successful");
        navigate("/"); // Redirect to home page after successful login
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Invalid credentials. Please try again.");
    } finally {
      setLoading(false); // Set loading to false once the API call completes
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse w-1/2">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h1 className="font-bold text-xl text-center mt-4">Sign In</h1>
          <form className="card-body" onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>

            {/* Login Button */}
            <div className="form-control mt-6">
              <button className="btn btn-primary" disabled={loading}>
                {loading ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;

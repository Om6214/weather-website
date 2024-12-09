import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [isOtpVisible, setIsOtpVisible] = useState(false); // State to track if OTP input should be displayed
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(""); // Keep OTP as a string temporarily, convert to number before submission
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for API calls

  // Handle continue button click
  const handleContinue = async (e) => {
    e.preventDefault(); // Prevent form submission
    setLoading(true); // Set loading to true when the API call starts

    // Send a request to get OTP using fetch API
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsOtpVisible(true); 
        console.log('OTP sent to email');
      } else {
        throw new Error('Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    const data = {
      name,
      email,
      otp: Number(otp), // Convert OTP to a number here
      password,
    };

    try {
      const response = await fetch('http://localhost:5000/api/auth/verifyotp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log(response);

      if (response.ok) {
        console.log('User signed up successfully');
        navigate("/signin"); // Redirect to SignIn page after successful signup
      } else {
        throw new Error('Invalid OTP or server error');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Invalid OTP or server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse w-1/2">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h1 className="font-bold text-xl text-center mt-4">Sign Up</h1>
          <form className="card-body" onSubmit={handleSubmit}>
            {/* Name Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
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
                placeholder="Password"
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

            {/* Continue Button */}
            {!isOtpVisible && (
              <div className="form-control mt-6">
                <button className="btn btn-primary" onClick={handleContinue} disabled={loading}>
                  {loading ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    'Continue'
                  )}
                </button>
              </div>
            )}

            {isOtpVisible && (
              <>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Enter OTP</span>
                  </label>
                  <input
                    type="number"
                    placeholder="OTP"
                    className="input input-bordered"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)} 
                  />
                </div>

                {/* Submit Button */}
                <div className="form-control mt-6">
                  <button className="btn btn-primary" type="submit" disabled={loading}>
                    {loading ? (
                      <span className="loading loading-spinner loading-xs"></span>
                    ) : (
                      'Submit'
                    )}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

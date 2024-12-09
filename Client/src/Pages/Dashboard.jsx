import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom"

const Dashboard = () => {

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://media.istockphoto.com/id/1007768414/photo/blue-sky-with-bright-sun-and-clouds.jpg?s=612x612&w=0&k=20&c=MGd2-v42lNF7Ie6TtsYoKnohdCfOPFSPQt5XOz4uOy4=)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl text-gray-900 font-bold">Hello there</h1>
          <p className="mb-5 text-gray-800">
            Weather website
          </p>

          {/* Button */}
          <Link to="/signin" className="btn btn-primary mt-4">Get Started</Link>

          {/* Footer */}
          <div className="mt-8 text-sm text-gray-950">
            <p>Made by Omnath Ganapure</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

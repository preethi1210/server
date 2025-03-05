import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import Eye Icons
import girl_img from "../assets/Images/girl_img.jpg";
import {login} from "../services/operations/authAPI"
const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [role, setRole] = useState("student"); // Toggle between Student & Instructor

  return (
    <div className="bg-gray-900 h-screen flex items-center justify-center">
      <div className="flex bg-gray-800 p-10 rounded-lg shadow-lg w-3/4 max-w-4xl">
        
        {/* Left Section - Form */}
        <div className="w-1/2 text-white flex flex-col justify-center pr-10">
          <h3 className="text-2xl font-bold text-amber-50">Welcome Back</h3>
          <p className="text-gray-400 mt-2">
            Build skills for today, tomorrow, and beyond.
            <span className="text-blue-300"> Education to future-proof your career.</span>
          </p>

          {/* Role Selection */}
          <div className="mt-4 flex gap-4">
            <button 
              className={`px-4 py-2 rounded-md ${
                role === "student" ? "bg-yellow-500 text-black" : "bg-gray-700 text-white"
              }`}
              onClick={() => setRole("student")}
            >
              Student
            </button>
            <button 
              className={`px-4 py-2 rounded-md ${
                role === "instructor" ? "bg-yellow-500 text-black" : "bg-gray-700 text-white"
              }`}
              onClick={() => setRole("instructor")}
            >
              Instructor
            </button>
          </div>

          {/* Form Fields */}
          <div className="mt-6">
            <label className="block text-white">Email Address *</label>
            <input
              type="email"
              placeholder="Enter email address"
              className="w-full p-2 rounded bg-gray-700 text-white mt-1"
            />

            <label className="block text-white mt-4">Password *</label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter Password"
                className="w-full p-2 rounded bg-gray-700 text-white mt-1 pr-10"
              />
              <span 
                className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button className="bg-yellow-500 text-black font-bold py-2 px-4 rounded mt-4 w-full">
              Sign in
            </button>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="w-1/2 flex items-center justify-center">
          <img src={girl_img} alt="girl" className="rounded-lg shadow-lg" />
        </div>
      </div>
    </div>
  );
};

export default Login;

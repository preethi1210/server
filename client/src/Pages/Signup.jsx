import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import girl_img from "../assets/Images/girl_img2.jpg";
import country_Code from "../assets/data/country-code.json";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "student",
    countryCode: "+91",
  });
  
  
  
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [countries, setCountries] = useState([]);

  // Load country codes safely

  useEffect(() => {
    if (country_Code && Array.isArray(country_Code.countries)) {
      setCountries(country_Code.countries);
    } else {
      console.error("Invalid country code data format.");
    }
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form
  const validateForm = () => {
    let newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone number must be 10 digits";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Data:", formData);
      alert("Account Created Successfully! 🎉");
    }
  };

  return (
    <div className="bg-gray-900 flex h-screen items-center justify-center">
      <div className="flex bg-gray-800 p-6 rounded-lg shadow-lg w-3/4 max-w-4xl">
        
        {/* Left Section - Form */}
        <div className="w-1/2 text-white flex flex-col justify-center pr-10">
          <h3 className="text-xl font-bold text-amber-50">
            Join the millions learning to code with StudyNotion for free
          </h3>
          <p className="text-gray-400 text-sm mt-2">
            Build skills for today, tomorrow, and beyond.{" "}
            <span className="text-blue-300">Education to future-proof your career.</span>
          </p>

          {/* Role Selection */}
          <div className="mt-3 flex gap-3">
            {["student", "instructor"].map((r) => (
              <button
                key={r}
                className={`px-3 py-1 rounded-md ${
                  formData.role === r ? "bg-yellow-500 text-black" : "bg-gray-700 text-white"
                }`}
                onClick={() => setFormData({ ...formData, role: r })}
              >
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-700 text-white mt-1 text-sm"
                />
                {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-sm">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-700 text-white mt-1 text-sm"
                />
                {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
              </div>
            </div>

            <label className="block text-sm mt-4">Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white mt-1 text-sm"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

            <label className="block text-sm mt-4">Phone Number</label>
            <div className="flex gap-2">
            <select
            name="countryCode"
            value={formData.countryCode}
            onChange={handleChange}
            className="bg-gray-700 text-white p-2 rounded text-sm"
          >
            {countries.length > 0 ? (
              countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.country} ({country.code})
                </option>
              ))
            ) : (
              <option disabled>Loading...</option>
            )}
          </select>
          
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white mt-1 text-sm"
              />
            </div>
            {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
            <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm">Create Password *</label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-700 text-white mt-1 pr-10 text-sm"
                />
                <span
                  className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm">Confirm Password *</label>
              <div className="relative">
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-700 text-white mt-1 pr-10 text-sm"
                />
                <span
                  className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                  onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                >
                  {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          
            <button
              type="submit"
              className="bg-yellow-500 text-black font-bold py-2 px-4 rounded mt-6 w-full text-sm"
            >
              Create Account
            </button>
          </form>
        </div>

        {/* Right Section - Image */}
        <div className="w-1/2 flex items-center justify-center">
          <img src={girl_img} alt="StudyNotion" className="rounded-lg shadow-lg" />
        </div>
      </div>
    </div>
  );
};

export default Signup;

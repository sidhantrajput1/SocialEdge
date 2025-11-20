import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        formData
      );

      toast.success("Registration successful! Please log in.");
      navigate("/login");

        // console.log("Registration successful:", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Side */}
      <div className="hidden md:flex w-1/3 bg-linear-to-b from-blue-300 to-blue-100 p-10 flex-col justify-center  shadow-lg">
        <h3 className="text-4xl font-extrabold text-blue-800 mb-4 tracking-wide">
          Join SocialEdge
        </h3>

        <p className="text-gray-800 leading-relaxed text-lg mb-4">
          Create your account and start connecting with the world. Discover
          trending stories, share ideas, and follow your passion.
        </p>

        <p className="text-gray-700 leading-relaxed">
          Your journey begins here — let your social presence grow with a
          community that inspires.
        </p>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex flex-col w-full md:w-2/3 items-center justify-center px-6">
        <h2 className="text-4xl font-extrabold text-orange-600 mb-8 tracking-tight">
          Create Account
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 w-full max-w-md bg-white shadow-xl p-8 rounded-2xl border border-gray-200"
        >
          <div>
            <label className="text-sm font-medium text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full border px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-orange-400 transition"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full border px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-orange-400 transition"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 w-full border px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-orange-400 transition"
              placeholder="Choose a username"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full border px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-orange-400 transition"
              placeholder="Create a password"
            />
          </div>

          <button
            type="submit"
            className="bg-orange-600 text-white py-2 rounded-md mt-2 hover:bg-orange-700 transition-all font-medium"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-gray-700">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-orange-600 font-medium hover:underline cursor-pointer"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

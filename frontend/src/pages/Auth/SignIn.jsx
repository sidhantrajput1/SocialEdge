import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        credentials
      );

      // console.log(res)


      if (res.data.success) {
        toast.success("Login successful!");
        
        // Store token in localStorage AND update AuthContext
        localStorage.setItem("authToken", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user))
        login(res.data.token, res.data.user);
        
        navigate("/");
        // console.log("LOGIN RESPONSE USER:", res.data.user);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Side */}
      <div className="hidden md:flex w-1/3 bg-linear-to-b from-orange-300 to-orange-100 p-10 flex-col justify-center shadow-lg">
        <h3 className="text-4xl font-extrabold text-orange-800 mb-4">SocialEdge</h3>
        <p className="text-gray-800 text-lg mb-4">
          Welcome to SocialEdge — connect, share, and grow with a global community.
        </p>
      </div>

      {/* Right Side */}
      <div className="flex flex-col w-full md:w-2/3 items-center justify-center px-6">
        <h2 className="text-4xl font-extrabold text-blue-600 mb-8">Welcome Back</h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 w-full max-w-md bg-white shadow-xl p-8 rounded-2xl border border-gray-200"
        >
          <div>
            <label className="text-sm font-medium text-gray-600">Email / Username</label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              className="mt-1 w-full border px-3 py-2 rounded-md"
              placeholder="Enter your username or email"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="mt-1 w-full border px-3 py-2 rounded-md"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-md mt-2 hover:bg-blue-700 font-medium cursor-pointer"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-gray-700">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 font-medium hover:underline cursor-pointer">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;

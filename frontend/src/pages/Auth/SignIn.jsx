import React from "react";

const SignIn = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Side */}
      <div className="hidden md:flex w-1/3 bg-linear-to-b from-orange-300 to-orange-100 p-10 flex-col justify-center  shadow-lg">
        <h3 className="text-4xl font-extrabold text-orange-800 mb-4">
          SocialEdge
        </h3>

        <p className="text-gray-800 leading-relaxed text-lg mb-4">
          Welcome to SocialEdge — a modern platform built to help you connect,
          share, and grow with a vibrant global community.
        </p>

        <p className="text-gray-700 leading-relaxed">
          Join thousands of creators and explore meaningful conversations,
          trending topics, and inspiring ideas every day.
        </p>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex flex-col w-full md:w-2/3 items-center justify-center px-6">
        <h2 className="text-4xl font-extrabold text-blue-600 mb-8">
          Welcome Back
        </h2>

        <form className="flex flex-col gap-5 w-full max-w-md bg-white shadow-xl p-8 rounded-2xl border border-gray-200">
          <div>
            <label className="text-sm font-medium text-gray-600">Email / Username</label>
            <input
              type="text"
              className="mt-1 w-full border px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Enter your username or email"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              className="mt-1 w-full border px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-md mt-2 hover:bg-blue-700 transition-all font-medium"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-gray-700">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 font-medium hover:underline">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;

"use client";
import React, { useState } from "react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: username, password: password }),
      });

      const data = await response.json();

      if (response.status === 401) {
        setError(data.error || "Invalid credentials");

        setError;
      } else {
        // Clear previous error
        setError(null);

        const { user, token, isAdmin, userId } = data;
        if (user && token) {
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", token);
          localStorage.setItem("isAdmin", isAdmin);
          localStorage.setItem("userId", userId);
          window.location.href = `/${userId}`;
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An unexpected error occurred");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen font-poppins">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <div className="text-center mb-3">
            <h1
              className="text-2xl font-bold text-blue-500"
              style={{ color: "#488BA8" }}
            >
              LOGIN
            </h1>
            <hr className="my-2 border-t border-gray-300" />
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-4 font-poppins">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-600"
                style={{ color: "#488BA8" }}
              >
                Email
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter your username or email"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
                style={{ color: "#488BA8" }}
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="showPassword"
                  className="mr-2"
                  name="showPassword"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                <label
                  htmlFor="showPassword"
                  className=" text-sm font-medium text-gray-600"
                  style={{ color: "#488BA8" }}
                >
                  Show Password
                </label>
              </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 font-bold font-poppins"
              style={{ backgroundColor: "#488BA8" }}
            >
              LOGIN
            </button>
          </form>

          {error && <div className="text-red-500 mt-2">{error}</div>}

          <div className="text-center mt-4">
            <a
              href="/user/forgetPassword"
              className=" font-regular hover:underline"
              style={{ color: "#488BA8" }}
            >
              Forget Password?
            </a>
          </div>

          <div className="text-center mt-2 font-poppins">
            <p>
              Don't have an account?{" "}
              <a
                href="/user/signup"
                className="font-regular hover:underline"
                style={{ color: "#488BA8" }}
              >
                Sign up now
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

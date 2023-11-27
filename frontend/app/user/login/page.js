"use client";
import React, { useState } from 'react';
import Navbar from '../../components/Navigation'; 

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3000/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: username, password: password })
    });

    try {
      const { user, token } = await response.json();
      if (user && token) {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        window.location.href = '/';    //pindah ke lokasi dashboard user
      } else {
        alert('Login Failed');
      }
    } catch (error) {
      alert('Login failed');
    }

    

    // if (user && token) {
    //   localStorage.setItem('user', JSON.stringify(user));
    //   localStorage.setItem('token', token);
    //   window.location.href = '/user/dashboard';
    // } else {
    //   alert('Login Failed');
    // }

  }


  return (
    <div>
      <div className="flex items-center justify-center min-h-screen font-poppins">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          {/* Judul Login */}
          <div className="text-center mb-3">
            <h1 className="text-2xl font-bold text-blue-500" style={{ color: '#488BA8' }}>
              LOGIN
            </h1>
            {/* Garis Lurus Horizontal */}
            <hr className="my-2 border-t border-gray-300" />
          </div>

          {/* Form */}
          <form onSubmit={handleLogin}>
            {/* Username/Email */}
            <div className="mb-4 font-poppins">
              <label htmlFor="username" className="block text-sm font-medium text-gray-600" style={{ color: '#488BA8' }}>Username or Email</label>
              <input
                type="text"
                id="username"
                name="username"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter your username or email"
                onChange={e => setUsername(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-600" style={{ color: '#488BA8' }}>Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter your password"
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 font-bold font-poppins"
              style={{ backgroundColor: '#488BA8' }}
            >
              LOGIN
            </button>
          </form>

          {/* Forget Password Link */}
          <div className="text-center mt-4">
            <a href="/user/forgetPassword" className=" font-regular hover:underline" style={{ color: '#488BA8' }}>Forget Password?</a>
          </div>

          {/* Belum Punya Akun Link */}
          <div className="text-center mt-2 font-poppins">
            <p>Don't have an account? <a href="/user/signup" className="font-regular hover:underline" style={{ color: '#488BA8' }}>Sign up now</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

"use client";
import React, { useState } from 'react';
import Navbar from '../../components/Navigation';

const SignupPage = () => {
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  


  const handleSubmit = async (event) => {
    if (password != passwordConfirmation) {
      alert("Password not match");
  
      // stop the function from running further
  
      return;
    }
    event.preventDefault();

    console.log (name);

    const response = await fetch('http://localhost:3000/api/v1/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        phone: phone,
        isAdmin: false,
        address: "Alamat Default",
        postalCode: 12345,
        city: "Kota Default",
        province: "Provinsi Default",
      })
    });

    const data = await response.json();

    if (data.error) {
      alert("Signup failed, user already exists");
    }

    if (data.status == 400) {
      alert("Signup failed");
    }
    else {
      alert("Signup success");
      // console.log (data);
      window.location.href = '/user/login';
    }
  }
  return (
   <div> 
    <div className="flex items-center justify-center min-h-screen font-poppins">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md mt-10 mb-10 font-poppins ">
        {/* Judul Signup */}
        <div className="text-center mb-3">
          <h1 className="text-2xl font-bold text-blue-500" style={{ color: '#488BA8' }}>
            SIGN UP
          </h1>
          {/* Garis Lurus Horizontal */}
          <hr className="my-2 border-t border-gray-300" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} >
          {/* Nama Lengkap */}
          <div className="mb-2">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-600" style={{ color: '#488BA8' }}>Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600" style={{ color: '#488BA8' }}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Nomor Telepon */}
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-600" style={{ color: '#488BA8' }}>Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter your phone number"
              onChange={(e) => setPhone(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Konfirmasi Password */}
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600" style={{ color: '#488BA8' }}>Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Confirm your password"
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </div>

          {/* Signup Button */}
          <button

            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 font-bold"
            style={{ backgroundColor: '#488BA8' }}
          >
            SIGN UP
          </button>
        </form>

        {/* Sudah Punya Akun Link */}
        <div className="text-center mt-4">
          <p>Already have an account? <a href="/user/login" className="font-regular hover:underline" style={{ color: '#488BA8' }}>Login now</a></p>
        </div>
      </div>
    </div>
   </div> 
  );
};

export default SignupPage;

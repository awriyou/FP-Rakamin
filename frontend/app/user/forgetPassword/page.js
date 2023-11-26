import React from 'react';
import Navbar from '../../components/Navigation';

const ForgotPasswordPage = () => {
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen font-poppins">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          {/* Judul Lupa Password */}
          <div className="text-center mb-3">
            <h1 className="text-2xl font-bold text-blue-500" style={{ color: '#488BA8' }}>
              FORGET PASSWORD
            </h1>
            {/* Garis Lurus Horizontal */}
            <hr className="my-2 border-t border-gray-300" />
          </div>

          {/* Form */}
          <form>
            {/* Email */}
            <div className="mb-4 font-poppins">
              <label htmlFor="email" className="block text-sm font-medium text-gray-600" style={{ color: '#488BA8' }}>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter your email"
              />
            </div>

            {/* Reset Password Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 font-bold font-poppins"
              style={{ backgroundColor: '#488BA8' }}
            >
              RESET PASSWORD
            </button>
          </form>

          {/* Kembali ke Login Link */}
          <div className="text-center mt-4 font-poppins">
            <p>Remember your password? <a href="/user/login" className="font-regular hover:underline" style={{ color: '#488BA8' }}>Login here</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

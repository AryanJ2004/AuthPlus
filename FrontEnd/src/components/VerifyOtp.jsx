import React, { useState } from 'react';

export default function VerifyOtp({ email, onOtpVerify, errorMessage }) {
  const [otp, setOtp] = useState('');

  const handleVerify = async (e) => {
    e.preventDefault();
    onOtpVerify(email, otp); // Pass email and OTP to the parent handler
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Verify OTP</h2>
      {errorMessage && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <span className="block sm:inline">{errorMessage}</span>
        </div>
      )}
      <form onSubmit={handleVerify} className="space-y-6">
        <div>
          <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
            Enter OTP
          </label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300"
          >
            Verify OTP
          </button>
        </div>
      </form>
    </div>
  );
}

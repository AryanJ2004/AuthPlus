import React from 'react';

export default function OTPForm({ otp, setOtp }) {
  return (
    <div>
      <label htmlFor="otp" className="block text-sm font-medium text-gray-700">Enter OTP</label>
      <input
        type="text"
        id="otp"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        required
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
      />
    </div>
  );
}

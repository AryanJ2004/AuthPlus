import React from 'react';

export default function ProfileActions({ showOtpField, handleSubmit, handleDeleteAccount }) {
  return (
    <div className="flex justify-between items-center">
      <button
        type="submit"
        className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
      >
        {showOtpField ? 'Verify OTP' : 'Update Profile'}
      </button>
      <button
        type="button"
        onClick={handleDeleteAccount}
        className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300"
      >
        Delete Account
      </button>
    </div>
  );
}

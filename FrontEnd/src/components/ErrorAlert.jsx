import React from 'react';

export default function ErrorAlert({ error }) {
  return (
    error && (
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
        <span className="block sm:inline">{error}</span>
      </div>
    )
  );
}

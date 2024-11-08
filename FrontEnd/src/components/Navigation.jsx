import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navigation() {
  const { isAuthenticated, logout } = useAuth()

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-white text-3xl font-extrabold hover:text-purple-200 transition duration-300 transform hover:scale-105"
        >
          <span className="bg-white text-indigo-600 px-2 py-1 rounded-lg mr-1">Auth</span>
          +
        </Link>
        <div className="space-x-2">
          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className="bg-white text-indigo-600 hover:bg-indigo-100 px-4 py-2 rounded-full font-semibold transition duration-300 transform hover:scale-105 hover:shadow-md"
              >
                Profile
              </Link>
              <button
                onClick={logout}
                className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-full font-semibold transition duration-300 transform hover:scale-105 hover:shadow-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-white text-indigo-600 hover:bg-indigo-100 px-4 py-2 rounded-full font-semibold transition duration-300 transform hover:scale-105 hover:shadow-md"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-indigo-500 text-white hover:bg-indigo-600 px-4 py-2 rounded-full font-semibold transition duration-300 transform hover:scale-105 hover:shadow-md"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
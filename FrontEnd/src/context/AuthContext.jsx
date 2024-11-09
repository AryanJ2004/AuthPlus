import React, { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext(null)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  const [userEmail, setUserEmail] = useState(""); // Store email when user registers
const [userOtp, setUserOtp] = useState("");
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      fetchUser()
    }
  }, [])

  const fetchUser = async () => {
  try {
    const response = await axios.get('https://auth-plus.vercel.app/me');
    setUser(response.data);
    setIsAuthenticated(true);
  } catch (error) {
    console.error('Error fetching user:', error.response?.data || error.message || error);
    logout();
  }
};


  const register = async (name, email, password) => {
    try {
      await axios.post('https://auth-plus.vercel.app/register', { name, email, password })
      return { success: true, message: 'Registration successful. Please check your email for OTP.' }
    } catch (error) {
      throw new Error(error.response?.data?.message || 'An error occurred during registration')
    }
  }

  const verifyOTP = async (email, otp) => {
    try {
      const response = await fetch("https://auth-plus.vercel.app/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        console.error("Error Verifying OTP:", data.message || data);
        throw new Error(data.message || "Invalid or expired OTP");
      }
    } catch (error) {
      console.error("Verification Error:", error);
      throw error;
    }
  };
  

  const login = async (email, password) => {
    try {
      const response = await axios.post('https://auth-plus.vercel.app/login', { email, password })
      localStorage.setItem('token', response.data.token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
      await fetchUser()
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message)
      } else {
        throw new Error('An error occurred during login')
      }
    }
  }

  const updateProfile = async (userData) => {
    try {
      const response = await axios.put('https://auth-plus.vercel.app/profile', userData)
      return { success: true, message: response.data.message }
    } catch (error) {
      throw new Error(error.response?.data?.message || 'An error occurred while updating profile')
    }
  }

  const verifyProfileUpdateOTP = async (otp) => {
    try {
      const response = await axios.post('https://auth-plus.vercel.app/verify-profile-update', { otp })
      setUser(response.data)
      return { success: true, message: 'Profile updated successfully.' }
    } catch (error) {
      throw new Error(error.response?.data?.message || 'An error occurred during OTP verification')
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
    setUser(null)
    setIsAuthenticated(false)
  }

  const deleteAccount = async () => {
    try {
      await axios.delete('https://auth-plus.vercel.app/delete')
      logout()
    } catch (error) {
      throw new Error(error.response?.data?.message || 'An error occurred while deleting the account')
    }
  }

  const value = {
    user,
    isAuthenticated,
    register,
    verifyOTP,
    login,
    updateProfile,
    verifyProfileUpdateOTP,
    logout,
    deleteAccount,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
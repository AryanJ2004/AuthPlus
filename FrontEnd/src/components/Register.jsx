// Register.js
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import ErrorMessage from './ErrorAlert'
import InputField from './InputField'
import SubmitButton from './SubmitButton'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [showOtpField, setShowOtpField] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { register, verifyOTP } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (password !== confirmPassword) {
      setError("Passwords don't match")
      return
    }
    try {
      if (!showOtpField) {
        const result = await register(name, email, password)
        setShowOtpField(true)
        setError(result.message)
      } else {
        await verifyOTP(email, otp)
        navigate('/login')
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Register</h2>
        
        <ErrorMessage error={error} />
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {!showOtpField ? (
            <>
              <InputField id="name" label="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
              <InputField id="email" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <InputField id="password" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <InputField id="confirmPassword" label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </>
          ) : (
            <InputField id="otp" label="Enter OTP" type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required />
          )}
          
          <SubmitButton label={showOtpField ? 'Verify OTP' : 'Register'} />
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Login here
          </Link>
        </p>
      </div>
    </div>
  )
}

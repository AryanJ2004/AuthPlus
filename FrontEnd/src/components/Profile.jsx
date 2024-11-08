import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ErrorAlert from './ErrorAlert';
import ProfileForm from './ProfileForm';
import OTPForm from './OTPForm';
import ProfileActions from './ProfileActions';

export default function Profile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);
  const [error, setError] = useState('');
  const { user, updateProfile, deleteAccount, verifyProfileUpdateOTP } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password && password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    try {
      if (!showOtpField) {
        const result = await updateProfile({ name, email, password });
        setShowOtpField(true);
        setError(result.message);
      } else {
        const result = await verifyProfileUpdateOTP(otp);
        setShowOtpField(false);
        setError(result.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await deleteAccount();
        navigate('/login');
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Profile</h2>
        <ErrorAlert error={error} />
        <form onSubmit={handleSubmit} className="space-y-6">
          {!showOtpField ? (
            <ProfileForm
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
            />
          ) : (
            <OTPForm otp={otp} setOtp={setOtp} />
          )}
          <ProfileActions
            showOtpField={showOtpField}
            handleSubmit={handleSubmit}
            handleDeleteAccount={handleDeleteAccount}
          />
        </form>
      </div>
    </div>
  );
}

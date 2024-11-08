const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');
const sendOTP = require('../utils/sendOTP');

// Generate a random 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const otp = generateOTP();

  try {
    await sendOTP(email, otp);

    const user = await User.create({
      name,
      email,
      password,
      otp,
      otpExpires: Date.now() + 10 * 60 * 1000, // OTP expires in 10 minutes
    });

    res.status(201).json({
      message: 'OTP sent to your email for verification',
    });
  } catch (error) {
    res.status(500).json({ message: 'Error in user registration: ' + error.message });
  }
};

const verifyOTP = async (req, res) => {
  try {

      const { email, otp } = req.body;

      if (!email || !otp) {
          return res.status(400).json({ message: 'Email and OTP are required' });
      }

      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Convert both OTPs to strings for comparison
      if (user.otp.toString() !== otp.toString() || user.otpExpires < Date.now()) {
          return res.status(400).json({ message: 'Invalid or expired OTP' });
      }

      user.isVerified = true;
      user.otp = undefined;
      user.otpExpires = undefined;
      await user.save();

      res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
      });
  } catch (error) {
      console.error("Server error:", error);
      res.status(500).json({ message: 'Server error: ' + error.message });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      if (!user.isVerified) {
        // Delete unverified user
        await User.deleteOne({ _id: user._id });
        // Return 403 status with a message to redirect to the registration page
        return res.status(403).json({ message: 'Email not verified. Please register again.' });
      }

      if (await user.matchPassword(password)) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};


const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      const otp = generateOTP();
      await sendOTP(user.email, otp);

      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }
      user.otp = otp;
      user.otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
      user.isVerified = false;

      await user.save();

      res.json({
        message: 'OTP sent to your email for verification',
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

const verifyProfileUpdateOTP = async (req, res) => {
  try {
    const { otp } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);
    if (user) {
      res.json({ message: 'User account deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};




module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  verifyOTP,
  verifyProfileUpdateOTP,
};

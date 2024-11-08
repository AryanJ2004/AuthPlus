const express = require('express')
const { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUser, verifyOTP, verifyProfileUpdateOTP } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/register', registerUser)
router.post('/verify-otp', verifyOTP)
router.post('/login', loginUser)
router.get('/me', protect, getUserProfile)
router.put('/profile', protect, updateUserProfile)
router.post('/verify-profile-update', protect, verifyProfileUpdateOTP)
router.delete('/delete', protect, deleteUser)

module.exports = router
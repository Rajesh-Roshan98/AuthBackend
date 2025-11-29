const express = require('express');
const router = express.Router();

// Dummy in-memory storage for OTP (replace with DB in production)
const otpStore = {};

// Send OTP
router.post('/sendotp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: "Email required" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = otp;

  console.log(`OTP for ${email}: ${otp}`); // For testing
  res.json({ success: true, message: 'OTP sent successfully' });
});

// Verify OTP
router.post('/verifyotp', (req, res) => {
  const { email, otp } = req.body;
  if (otpStore[email] && otpStore[email] === otp) {
    delete otpStore[email]; // OTP used
    return res.json({ success: true, message: 'OTP verified' });
  }
  res.status(400).json({ success: false, message: 'Invalid OTP' });
});

// Signup
router.post('/signup', (req, res) => {
  const { firstName, lastName, email, password, otp } = req.body;
  if (!firstName || !lastName || !email || !password || !otp) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  // Normally save to DB here
  res.json({ success: true, message: 'Account created successfully!' });
});

module.exports = router;

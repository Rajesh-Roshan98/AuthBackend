const express = require('express');
const { sendOtp, signUp, loginUser, logoutUser, getUserDetail, verifyOtp } = require('../controller/authController');
const { auth } = require('../middleware/authMiddleware');

const Router = express.Router();

Router.post('/sendotp', sendOtp);
Router.post('/signup', signUp);
Router.post('/login', loginUser);
Router.post('/logout', logoutUser);
Router.get('/getUserDetail', auth, getUserDetail);
Router.post('/verifyotp', verifyOtp);
Router.get("/verify-token", auth, (req, res) => {
    res.status(200).json({
        success: true,
        valid: true,
        user: req.user,
    });
});

Router.get("/test", (req, res) => res.json({ success: true, msg: "Backend working!" }));


module.exports = Router;

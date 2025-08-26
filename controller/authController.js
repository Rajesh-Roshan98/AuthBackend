const User = require('../model/userModel');
const Otp = require('../model/otpModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// OTP validity time in milliseconds (5 minutes)
const OTP_EXPIRY = 5 * 60 * 1000;

// -------------------- SEND OTP --------------------
exports.sendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists, please try login"
            });
        }

        const otpValue = Math.floor(100000 + Math.random() * 900000);

        const otpData = {
            email,
            otp: otpValue,
            createdAt: Date.now()
        };

        // Upsert OTP
        await Otp.findOneAndUpdate(
            { email },
            otpData,
            { upsert: true, new: true }
        );

        // TODO: Integrate with real email service here
        console.log(`Generated OTP for ${email}: ${otpValue}`);

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            ...(process.env.NODE_ENV !== "production" && { otp: otpValue }) // Only send OTP in dev
        });

    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
};

// -------------------- SIGN UP --------------------
exports.signUp = async (req, res) => {
    try {
        const { firstName, middleName, lastName, email, password, role, otp } = req.body;

        if (!firstName || !lastName || !email || !password || !role || !otp) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "User already exists" });
        }

        const findOtp = await Otp.findOne({ email });
        if (!findOtp) {
            return res.status(400).json({ success: false, message: "OTP not found" });
        }

        // Check OTP expiry
        if (Date.now() - findOtp.createdAt > OTP_EXPIRY) {
            await Otp.deleteOne({ email });
            return res.status(400).json({ success: false, message: "OTP expired" });
        }

        if (findOtp.otp != otp) {
            return res.status(400).json({ success: false, message: "Invalid OTP" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            firstName,
            middleName,
            lastName,
            email,
            password: hashedPassword,
            role
        });

        // Delete OTP after successful signup
        await Otp.deleteOne({ email });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                role: newUser.role
            }
        });

    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
};

// -------------------- LOGIN --------------------
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and Password are required" });
        }

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            role: user.role
        });

    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
};

// -------------------- LOGOUT --------------------
exports.logoutUser = async (req, res) => {
    // For JWT, just respond success. For blacklisting, add token to blacklist here if needed.
    return res.status(200).json({ success: true, message: "Logged out successfully" });
};

// -------------------- GET USER DETAILS --------------------
exports.getUserDetail = async (req, res) => {
    try {
        const userId = req.user.userId;

        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            message: "User details fetched successfully",
            user
        });

    } catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
};

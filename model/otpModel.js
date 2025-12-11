const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is Required"],
        trim: true
    },
    otp: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300 
    }
}, { timestamps: true });

module.exports = mongoose.model("Otp", otpSchema);

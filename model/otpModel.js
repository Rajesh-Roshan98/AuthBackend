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
        expires: 300 // ⏳ 300 seconds = 5 minutes
    }
}, { timestamps: true });

// TTL index on createdAt will auto-delete document after expires time
module.exports = mongoose.model("Otp", otpSchema);

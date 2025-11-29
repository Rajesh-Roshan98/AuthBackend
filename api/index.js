const express = require('express');
const cors = require('cors');
const { dbConnect } = require('../config/dbConnect');
const authRouter = require('../routes/authRouter');

const app = express();

// Middleware
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

// Connect DB per request
app.use(async (req, res, next) => {
  try {
    await dbConnect();
    next();
  } catch (err) {
    return res.status(500).json({ message: "DB connection failed", error: err.message });
  }
});

// Routes
app.use('/api/v1', authRouter);

// Fallback for undefined routes
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

// Export serverless handler
module.exports = (req, res) => {
  app(req, res);
};

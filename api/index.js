const express = require('express');
const { dbConnect } = require('../config/dbConnect');
const userrouter = require('../routes/authRouter');
const cors = require('cors');

const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

// DB connect per request
app.use(async (req, res, next) => {
  try {
    await dbConnect();
    next();
  } catch (err) {
    return res.status(500).json({ message: "DB connection failed", error: err.message });
  }
});

// Routes
app.use('/api/v1', userrouter);

// Export as serverless function
module.exports = (req, res) => {
  app(req, res);
};

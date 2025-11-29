const express = require('express');
const cors = require("cors");
require('dotenv').config();

const { dbConnect } = require('../config/dbConnect');
const userrouter = require('../routes/authRouter');

const app = express();

// CORS
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

// Routes
app.use('/api/v1', userrouter);

// Connect to MongoDB
dbConnect();

// Local dev server
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`✅ Server running locally on port ${PORT}`);
  });
}

// Export for Vercel
module.exports = app;

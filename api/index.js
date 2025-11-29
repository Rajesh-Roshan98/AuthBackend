const express = require('express');
const { dbConnect } = require('../config/dbConnect');
const userrouter = require('../routes/authRouter');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use('/api/v1', userrouter);

// Connect to MongoDB on each request (for serverless)
app.use(async (req, res, next) => {
  try {
    await dbConnect();
    next();
  } catch (err) {
    console.error("❌ DB connection failed:", err.message);
    res.status(500).json({ success: false, message: 'Database connection failed' });
  }
});

// Health check
app.get('/', (req, res) => {
  res.send('🚀 API is running!');
});

// ✅ For Vercel serverless export
module.exports = app;

// ✅ Local dev server
if (require.main === module) {
  (async () => {
    try {
      await dbConnect();
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
        console.log(`✅ Server running locally on port ${PORT}`);
      });
    } catch (err) {
      console.error('❌ Failed to start server:', err.message);
    }
  })();
}

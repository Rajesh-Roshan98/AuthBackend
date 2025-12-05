const app = require("../index");
const dbConnect = require("../config/dbConnect");

// Cache the database connection state
let isConnected = false;

module.exports = async (req, res) => {
  // 1. Connect to DB if not already connected
  if (!isConnected) {
    try {
      await dbConnect();
      isConnected = true;
      console.log("✅ MongoDB connected via Vercel Function");
    } catch (error) {
      console.error("❌ DB Connection Error:", error);
      return res.status(500).send("Database Connection Failed");
    }
  }

  // 2. Hand off the request to Express
  // Vercel treats the Express 'app' as a request handler function
  return app(req, res);
};
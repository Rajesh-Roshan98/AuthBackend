// ----------------------------------------------
// Dependencies & Config
// ----------------------------------------------
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const dbConnect = require("./config/dbConnect");
const authRouter = require("./routes/authRouter");

const app = express();

// ----------------------------------------------
// Middleware
// ----------------------------------------------
app.use(
  cors({
    origin: "*",        // Allow all origins (change for production)
    credentials: true,
  })
);

app.use(express.json()); // Parse JSON body

// ----------------------------------------------
// Utility / System Routes
// ----------------------------------------------

// Prevent favicon errors
app.get("/favicon.ico", (_, res) => res.sendStatus(204));

// Root route - basic server check
app.get("/", (_, res) => {
  res.status(200).send("API is running ✅");
});

// Health check route
app.get("/health", (_, res) => {
  const dbStatus = mongoose.connection.readyState; // 0,1,2,3

  if (dbStatus === 1) {
    return res.status(200).json({
      server: "Running",
      database: "Connected",
      timestamp: new Date(),
    });
  }

  return res.status(500).json({
    server: "Running",
    database: "Disconnected",
    status_code: dbStatus,
  });
});

// ----------------------------------------------
// Application Routes
// ----------------------------------------------
app.use("/api/v1", authRouter);

// ----------------------------------------------
// Local Development Server
// (Vercel ignores this block)
// ----------------------------------------------
if (require.main === module) {
  dbConnect()
    .then(() => {
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () =>
        console.log(`🚀 Server running locally on port ${PORT}`)
      );
    })
    .catch((err) => {
      console.error("❌ DB Connection Error (Local)", err);
    });
}

// ----------------------------------------------
// Export App for Serverless (Vercel)
// ----------------------------------------------
module.exports = app;
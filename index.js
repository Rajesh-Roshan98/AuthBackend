require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const dbConnect = require("./config/dbConnect");
const authRouter = require("./routes/authRouter");

const app = express();

app.use(
  cors({
    origin: [
        "https://auth-frontend-alpha-ten.vercel.app",
        "http://localhost:5173", 
        "http://localhost:3000"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json()); 
app.get("/favicon.ico", (_, res) => res.sendStatus(204));

app.get("/", (_, res) => {
  res.status(200).send("API is running ✅");
});

app.get("/health", (_, res) => {
  const dbStatus = mongoose.connection.readyState; 

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


app.use("/api/v1", authRouter);

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

module.exports = app;
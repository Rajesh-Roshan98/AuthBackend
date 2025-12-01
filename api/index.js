const serverless = require("serverless-http");
const app = require("../index");
const dbConnect = require("../config/dbConnect");

let isConnected = false; // Prevent multiple DB reconnects

// Export ONLY the handler — no "module.exports = app"
module.exports = async (req, res) => {
  if (!isConnected) {
    await dbConnect();
    isConnected = true;
    console.log("MongoDB connected inside serverless function");
  }

  const handler = serverless(app);
  return handler(req, res);
};

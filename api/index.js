const serverless = require("serverless-http");
const app = require("../index");
const dbConnect = require("../config/dbConnect");

let isConnected = false;

const handler = async (req, res) => {
  // Connect DB once
  if (!isConnected) {
    await dbConnect();
    isConnected = true;
    console.log("MongoDB connected inside serverless function");
  }
  // Call serverless handler
  return serverless(app)(req, res);
};

module.exports = handler;

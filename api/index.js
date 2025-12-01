const serverless = require("serverless-http");
const app = require("../index");
const dbConnect = require("../config/dbConnect");

let isConnected = false;

// Pre-create serverless handler
const handler = serverless(app);

module.exports = async (req, res) => {
  if (!isConnected) {
    await dbConnect();
    isConnected = true;
    console.log("MongoDB connected inside serverless function");
  }
  return handler(req, res);
};

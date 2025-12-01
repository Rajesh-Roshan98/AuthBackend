const serverless = require("serverless-http");
const app = require("../index");
const dbConnect = require("../config/dbConnect");

let isConnected = false;

const serverlessHandler = serverless(app);

module.exports = async function handler(req, res) {
  if (!isConnected) {
    await dbConnect();
    isConnected = true;
    console.log("MongoDB connected inside serverless function");
  }
  return serverlessHandler(req, res);
};

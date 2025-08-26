const express = require('express');
const { dbConnect } = require('./config/dbConnect');
const userrouter = require('./routes/authRouter');
require('dotenv').config();
const cors = require("cors");

const app=express();
app.use(cors({
    origin:"*",
    credentials: true
}))
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use('/api/v1',userrouter);
app.listen(PORT, () => {dbConnect();
    console.log(`Your server is Active on PORT:${PORT}`)
})
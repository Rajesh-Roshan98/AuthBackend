const express = require('express');
const { dbConnect } = require('./config/dbConnect');
const userrouter = require('./routes/authRouter');
require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(cors({
    origin: "*",
    credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('API is running ✅');
});

app.use('/api/v1', userrouter);

dbConnect();

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
  });
}

module.exports = app;

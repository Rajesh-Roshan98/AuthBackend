const express = require('express');
const userrouter = require('./routes/authRouter');
require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(cors({ origin: "*", credentials: true }));

app.use(express.json());

app.get('/favicon.ico', (req, res) => res.sendStatus(204));

app.get('/', (req, res) => {
  res.status(200).send('API is running ✅');
});

app.use('/api/v1', userrouter);

// ❌ REMOVE dbConnect();
// Vercel connects DB inside api/index.js

// Local development mode
if (require.main === module) {
  const dbConnect = require('./config/dbConnect');
  
  dbConnect().then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`✅ Server running on ${PORT}`);
    });
  });
}

module.exports = app;
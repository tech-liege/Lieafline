const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: ['http://localhost:3000', 'https://lieafline.vercel.app'],
  methods: 'GET,POST,PATCH,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // only if you're using cookies or need credentials
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    text: 'Lieafline API running',
    status: true,
  });
});

const authRoute = require('./routes/auth');
app.use('/api/auth', authRoute);

// Connect to MongoDB and start the server

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    connected => console.log('MongoDB connected'),
    () => app.listen(PORT, () => console.log(`Server running on ${PORT}`))
  )
  .catch(err => console.error(err));

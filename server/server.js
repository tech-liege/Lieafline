const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://dev-lieafline.vercel.app",
    "https://lieafline.vercel.app",
  ],
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/server/health', (req, res) => {
  res.json({
    text: 'Lieafline server running',
    status: true,
  });
});

// routes
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const skillRoute = require('./routes/skill');
app.use('/server/auth', authRoute);
app.use('/server/user', userRoute);
app.use('/server/skill', skillRoute);


// error handling
const { notFound, errorHandler } = require('./middleware/errorM');

app.use(notFound);
app.use(errorHandler);


// Connect to MongoDB and start the server

let loop = 0;

const connectWithRetry = () => {
  if (loop < 20) {
    console.log('🕐 Attempting MongoDB connection...');
    mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log('✅ MongoDB connected.');
        app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
      })
      .catch(err => {
        console.error('❌ MongoDB connection failed. Retrying in 5 seconds...', err.message);
        setTimeout(connectWithRetry, 10000); // retry after 10 seconds
      });
  } else {
    console.log('retry limited to avoid infinite loop');
  }

  loop += 1;
};

connectWithRetry();

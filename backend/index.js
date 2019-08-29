const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

// Configure environment vars
dotenv.config()

const app = express();
const port = process.env.PORT || 3000;

// Connect to DB
mongoose.connect(
  process.env.DB_CONN_STRING, 
  { useNewUrlParser: true },
  () => console.log('Connected to DB')
)

// Middleware
app.use(express.json());

// Route middleware
app.use('/api/auth', authRoute);
app.use('/api/post', postRoute);

app.listen(port, () => console.log(`Server is up and running at http://localhost:${port}/`));

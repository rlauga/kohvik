// index.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/food-ordering', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a simple route
app.get('/', (req, res) => {
  res.send('Welcome to the Food Ordering App');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

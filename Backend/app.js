const express = require('express');
const app = express();

// Example route
app.get('/', (req, res) => {
  res.send('Hello from Express app.js!');
});

module.exports = app;

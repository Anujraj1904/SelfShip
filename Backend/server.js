const http = require('http');
const app = require("./app");

const connectDB = require('./config/db.js');

const PORT = process.env.PORT || 4000;

// Connect to database
connectDB();

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
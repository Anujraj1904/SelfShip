const http = require('http');
const app = require("./app");
const { initializeSocket } = require('./socket');
const PORT = process.env.PORT || 4000;


const server = http.createServer(app);

initializeSocket(server);

const connectDB = require('./config/db.js');


// Connect to database
connectDB();


server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
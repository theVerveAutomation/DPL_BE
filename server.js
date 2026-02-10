require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const sequelize = require("./config/database");
const http = require('http');
const config = require('./config/config');
const startWSServer = require('./wsServer');

// Middleware
app.use(express.json());
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      'http://localhost:3001',
      'http://192.168.1.35:3004'
    ];

    // allow requests with no origin (Postman, curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true
}));

// Routes
app.use("/api/auth", require("./routes/adminRoutes"));
app.use('/api/baseip', require("./routes/base_IPRoutes"));
app.use('/api/robot', require("./routes/index"));
app.use('/api/map', require("./routes/map.routes"));

// Create a single HTTP server to handle both Express and WebSockets
const server = http.createServer(app);

// Initialize the WebSocket server on the single HTTP server
const wss = startWSServer(server);

// Start the one and only server
server.listen(config.server.port, '0.0.0.0' , () => {
  const port = config.server.port;
  console.log(`Backend listening on port ${port}`);
  console.log(`Server running on port ${port}`);
});

// sequelize
//   .sync({ alter: true }) // Updates tables without dropping data
//   .then(() => console.log("✅ Database & tables synced successfully!"))
//   .catch((err) => console.error("❌ Error syncing database:", err));
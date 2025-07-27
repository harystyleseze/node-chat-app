const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');

const chatRoutes = require('./routes/chatRoutes');
const chatController = require('./controllers/chatController');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  // Configure Socket.io for clustering
  transports: ['polling', 'websocket'],
  allowEIO3: true,
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// API routes under /api/chat
app.use('/api/chat', chatRoutes);

// Socket.io connection event
io.on('connection', (socket) => {
  chatController.handleConnection(socket, io);
});

module.exports = server;

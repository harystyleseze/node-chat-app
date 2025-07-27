const messageModel = require('../models/messageModel');

const users = new Map(); // socket.id -> username

async function handleConnection(socket, io) {
  console.log(`Client connected on worker ${process.pid}: ${socket.id}`);

  // Listen for username set event
  socket.on('setUsername', async (username) => {
    users.set(socket.id, username);
    console.log(`User ${username} connected`);

    // Notify others that user joined
    io.emit('userJoined', username);

    // Send chat history to this new user
    const history = await messageModel.getHistory();
    socket.emit('chatHistory', history);
  });

  // Listen for chat messages
  socket.on('chatMessage', async (text) => {
    const sender = users.get(socket.id) || 'Anonymous';
    const message = {
      text,
      timestamp: new Date().toISOString(),
      sender,
    };
    await messageModel.addMessage(message);
    io.emit('chatMessage', message);
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    const username = users.get(socket.id);
    if (username) {
      users.delete(socket.id);
      io.emit('userLeft', username);
      console.log(`User ${username} disconnected`);
    }
  });
}

// Controller method to get chat history for HTTP route
async function getChatHistory(req, res) {
  try {
    const history = await messageModel.getHistory();
    res.json(history);
  } catch (err) {
    console.error('Error getting chat history:', err);
    res.status(500).json({ error: 'Failed to get chat history' });
  }
}

module.exports = { handleConnection, getChatHistory };

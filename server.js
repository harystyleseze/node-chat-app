const cluster = require('cluster');
const os = require('os');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers equal to number of CPU cores
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Optional: restart worker on exit
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Starting a new one...`);
    cluster.fork();
  });
} else {
  // Worker processes run this code

  const app = express();
  const server = http.createServer(app);
  const io = socketio(server);

  app.use(express.static('public'));

  io.on('connection', (socket) => {
    console.log(`New client connected on worker ${process.pid}`);

    socket.on('chatMessage', (msg) => {
      console.log(`Worker ${process.pid} received message: ${msg}`);
      // Broadcast message to all clients except sender
      socket.broadcast.emit('chatMessage', msg);
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected from worker ${process.pid}`);
    });
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Worker ${process.pid} listening on port ${PORT}`);
  });
}

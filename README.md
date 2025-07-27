# Scalable Real-time Chat Application with Node.js, Cluster, and PM2

## Overview

This project is a **simple real-time chat application** built using **Node.js**, **Express**, and **Socket.io**. It demonstrates the scalability capabilities of Node.js by leveraging the **cluster module** to utilize multiple CPU cores, and **PM2** to manage multiple worker processes for better performance and reliability.

---

## What is This?

* A web-based chat app where users can send and receive messages instantly.
* Uses **Socket.io** for real-time, bi-directional communication between clients and the server.
* Utilizes **Node.js cluster module** to spawn multiple worker processes to maximize CPU usage.
* Managed by **PM2**, a process manager that handles clustering, automatic restarts, and monitoring.

---

## Why Use Clustering and PM2?

Node.js runs on a single thread, which limits it to one CPU core by default. The cluster module allows Node.js to:

* Fork multiple worker processes.
* Each worker can handle requests independently.
* Take advantage of multi-core CPU architectures, improving throughput.

PM2 simplifies running Node.js apps in cluster mode with:

* Easy process management.
* Load balancing across workers.
* Automatic restarts on failure.
* Monitoring tools.

Together, they enhance the app’s ability to handle many simultaneous connections efficiently.

---

## Project Structure

```
node-chat-app/
│
├── public/
│   ├── index.html       # Frontend HTML interface
│   └── script.js        # Client-side JS for Socket.io communication
│
├── server.js            # Node.js backend with clustering and Socket.io
├── package.json         # Project dependencies
└── README.md            # This documentation file
```

---

## Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/en/download/) (v12+ recommended)
* npm (comes with Node.js)
* (Optional) PM2 globally installed

---

### Installation

1. Clone the repository or download the files.

2. Install dependencies:

```bash
npm install express socket.io
```

3. (Optional) Install PM2 globally for process management:

```bash
npm install -g pm2
```

---

## Running the Application

### Run using Node (single master process with workers)

```bash
node server.js
```

* Opens a server at [http://localhost:3000](http://localhost:3000)
* Open multiple browser tabs/windows and chat between them.
* Terminal shows logs indicating which worker process handles connections and messages.

---

### Run using PM2 (cluster mode with multiple worker processes)

```bash
pm2 start server.js -i max
```

* `-i max` runs as many worker processes as CPU cores.
* PM2 manages the lifecycle, restarting crashed workers automatically.
* Monitor status with:

```bash
pm2 list
```

* Stop all PM2 processes with:

```bash
pm2 stop all
```

---

## How to Use

1. Open [http://localhost:3000](http://localhost:3000) in multiple browser tabs or devices.
2. Type messages in the input box and click **Send** or press Enter.
3. Messages appear instantly on all connected clients (except the sender’s message is labeled “You”).
4. Watch terminal logs showing worker process IDs handling messages.

---

## How This Demonstrates Node.js Scalability

* **Event-driven, non-blocking architecture:** Efficiently handles multiple clients without blocking.
* **Clustering:** Uses multiple CPU cores, improving performance under load.
* **Socket.io:** Handles real-time messaging with WebSocket fallback, providing a robust communication channel.
* **PM2:** Simplifies process management, enabling zero-downtime reloads and auto restarts.

This setup can be further scaled horizontally by deploying multiple machines behind a load balancer.

---

## Expected Output

* Real-time message exchange between users.
* Multiple worker processes running in terminal logs.
* Smooth, lag-free chat even when multiple clients are connected.
* PM2 monitoring multiple clustered processes.

---

## Troubleshooting & Tips

* If port 3000 is busy, change the `PORT` variable in `server.js` or set environment variable `PORT=your_port`.
* Make sure PM2 is installed globally to use `pm2` commands.
* For production, consider using HTTPS and environment variables for configuration.
* To stop PM2-managed apps, use `pm2 stop server` or `pm2 delete server`.

---

## Further Improvements

* Add user authentication.
* Persist chat history with a database (MongoDB, Redis).
* Add private messaging and rooms.
* Deploy on cloud platforms with horizontal scaling (Kubernetes, Docker Swarm).

---

## License

MIT License — free to use and modify!

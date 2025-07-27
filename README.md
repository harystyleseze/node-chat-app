# 📡 Node.js Real-time Chat App (MVC + Clustering + PM2)

A scalable, real-time chat application built with **Node.js**, **Express**, **Socket.io**, and **PM2** using a **clean MVC architecture**, supporting:

* Real-time messaging with **Socket.io**
* Persistent chat history (stored in a JSON file)
* **Usernames** with join/leave notifications
* **Cluster mode** for multi-core scalability
* **PM2** for production-grade process management

---

## 🔧 Project Structure

```
node-chat-app/
│
├── chatHistory.json         # Persistent chat history (last 100 messages)
│
├── public/                  # Static frontend files
│   ├── index.html           # Chat interface
│   └── script.js            # Frontend JS (Socket.io client)
│
├── src/
│   ├── controllers/         # Chat logic (socket and history management)
│   │   └── chatController.js
│   │
│   ├── models/              # File-based chat history storage
│   │   └── messageModel.js
│   │
│   ├── routes/              # REST API routes
│   │   └── chatRoutes.js
│   │
│   ├── app.js               # Express app and socket.io integration
│   └── server.js            # Clustered server using Node.js cluster module
│
├── package.json
└── README.md
```

---

## ✨ Features

* ✅ **Real-time chat** using `Socket.io`
* ✅ **Usernames** with `prompt()` and identity tracking
* ✅ **Join/Leave notifications**
* ✅ **Persistent chat history** (up to last 100 messages) stored in `chatHistory.json`
* ✅ **REST API endpoint** to fetch chat history (`GET /api/chat/history`)
* ✅ **Clustered server** using `Node.js cluster` to utilize all CPU cores
* ✅ **PM2 integration** for process management, clustering, and monitoring
* ✅ **Clean MVC structure** separating concerns

---

## 🖥️ Frontend UI

* HTML/CSS/JS based, no frameworks needed
* Socket.io client integration
* Prompts user for a **username** on connect
* Displays messages and system notifications

---

## 📦 Requirements

* Node.js (v14 or later)
* npm
* PM2 (optional for production)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/harystyleseze/node-chat-app.git
cd node-chat-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the App (Single Process, for Dev)

```bash
node src/server.js
```

Open your browser and go to:
👉 `http://localhost:3000`

---

## 📡 Real-time Chat Usage

* On load, you're asked to enter a **username**.
* Messages are broadcast to **all users**.
* Users are notified when **someone joins or leaves**.
* Up to 100 messages are saved in `chatHistory.json`.

---

## 🧪 API Endpoints

| Method | Endpoint            | Description                            |
| ------ | ------------------- | -------------------------------------- |
| GET    | `/api/chat/history` | Returns last 100 chat messages in JSON |

Example:

```bash
curl http://localhost:3000/api/chat/history
```

---

## ⚙️ Cluster Mode (Multi-Core)

Uses Node's `cluster` module in `src/server.js` to fork one worker per CPU core.

```bash
node src/server.js
```

Each worker handles its own socket connections and serves the same shared chat history.

---

## 🔁 Run with PM2 (Recommended for Production)

### 1. Install PM2 globally (if not already):

```bash
npm install -g pm2
```

### 2. Start app in cluster mode with all CPU cores:

```bash
pm2 start src/server.js -i max --name node-chat-app
```

### 3. Monitor logs:

```bash
pm2 logs node-chat-app
```

### 4. List all PM2 processes:

```bash
pm2 list
```

### 5. Stop or restart:

```bash
pm2 stop node-chat-app
pm2 restart node-chat-app
```

---

## 🧼 Cleaning Up

To reset chat history:

```bash
rm chatHistory.json
```

---

## 🛠 Tech Stack

* **Backend**: Node.js, Express, Socket.io
* **Frontend**: Vanilla HTML, CSS, JS
* **Architecture**: MVC (Model-View-Controller)
* **Process Manager**: PM2
* **Clustering**: Node.js `cluster` module

---

## 🧠 Architecture Overview

### MVC Breakdown:

* **Model (`messageModel.js`)**: Handles persistent chat history using a JSON file.
* **Controller (`chatController.js`)**: Manages socket events, user tracking, broadcasting messages.
* **View (`public/`)**: User interface, message input, and rendering.
* **Route (`chatRoutes.js`)**: REST API for chat history.

### Scaling with Clustering

* Master process forks `n` workers (where `n = #CPU cores`)
* Each worker runs its own server instance
* If a worker crashes, the master restarts it

---

## 🛡 Security Notes (for Production based feature)

* Sanitize and validate usernames/messages
* Rate-limit incoming events
* Enable Redis or a DB for scalable history
* Use HTTPS + authentication for secure production setup

---

## 📝 Future Enhancements

* ✅ Private messaging (DMs)
* ✅ Typing indicators
* ✅ Online user list
* ✅ Migrate storage to a real database (MongoDB, PostgreSQL)
* ✅ User login system

---

## 👨‍💻 Author

**Your Name**
GitHub: [@harystyleseze](https://github.com/harystyleseze)

---

## 📄 License

MIT License

const socket = io();

const chat = document.getElementById('chat');
const form = document.getElementById('messageForm');
const input = document.getElementById('messageInput');

let username = '';

// Append chat message to chat window
function appendMessage(message, isOwn = false) {
  const div = document.createElement('div');
  const time = new Date(message.timestamp).toLocaleTimeString();
  div.textContent = `${isOwn ? 'You' : message.sender} [${time}]: ${message.text}`;
  if (isOwn) div.classList.add('own-message');
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

// Append notification (join/leave) message
function appendNotification(text) {
  const div = document.createElement('div');
  div.textContent = text;
  div.classList.add('notification');
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

// Prompt user for username and notify server
function askUsername() {
  username = prompt('Enter your username:');
  if (!username || username.trim() === '') {
    username = 'Anonymous';
  }
  socket.emit('setUsername', username);
}

socket.on('connect', () => {
  askUsername();
});

socket.on('chatHistory', (history) => {
  chat.innerHTML = '';
  history.forEach(msg => appendMessage(msg, msg.sender === username));
});

socket.on('chatMessage', (msg) => {
  appendMessage(msg, msg.sender === username);
});

socket.on('userJoined', (user) => {
  appendNotification(`${user} joined the chat`);
});

socket.on('userLeft', (user) => {
  appendNotification(`${user} left the chat`);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = input.value.trim();
  if (!message) return;
  appendMessage({ text: message, timestamp: new Date().toISOString(), sender: 'You' }, true);
  socket.emit('chatMessage', message);
  input.value = '';
});

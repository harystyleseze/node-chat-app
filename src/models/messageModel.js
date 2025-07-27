const fs = require('fs').promises;
const path = require('path');

const CHAT_FILE = path.join(__dirname, '..', '..', 'chatHistory.json');

async function getHistory() {
  try {
    const data = await fs.readFile(CHAT_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      return []; // File does not exist yet
    }
    throw err;
  }
}

async function addMessage(msg) {
  const history = await getHistory();
  history.push(msg);

  // Keep only last 100 messages
  const limited = history.slice(-100);

  await fs.writeFile(CHAT_FILE, JSON.stringify(limited, null, 2));
  return msg;
}

module.exports = { getHistory, addMessage };

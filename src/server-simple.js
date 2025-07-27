// Simple server without clustering for testing
const server = require('./app');
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Simple server listening on port ${PORT}`);
});

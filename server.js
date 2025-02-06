// server.js
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);

// Create WebSocket server
const wss = new WebSocket.Server({ server });

// Serve static files (e.g., HTML, CSS, JS)
app.use(express.static('public'));

// Set up WebSocket connections
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Broadcast incoming messages to all clients
  ws.on('message', (message) => {
    console.log('received: %s', message);
    // Broadcast message to all connected clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // When client disconnects
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

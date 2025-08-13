const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Servir o HTML
app.use(express.static('public'));

// WebSocket
wss.on('connection', ws => {
  console.log('Cliente conectado via WebSocket');

  ws.send('Conexão WebSocket bem-sucedida!');

  ws.on('message', message => {
    console.log(`Mensagem recebida: ${message}`);
    ws.send(`Você disse: ${message}`);
  });
});

// Iniciar servidor HTTP + WebSocket
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

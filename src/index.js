import { createServer } from 'http';
import express from 'express';
import fetch from 'node-fetch';
import {
  getTemperatureData,
  runTemperatureInterval
} from './temperatureSensor.js';
import { WebSocketServer } from 'ws';

const app = express();
const port = 3000;

// Create an HTTP server and integrate it with the Express app
const server = createServer(app);

const wss = new WebSocketServer({ noServer: true });

// Attach WebSocket server to the HTTP server
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

app.use(express.json());

app.use((_, res, next) => {
  res.setHeader('access-control-allow-origin', '*');
  res.setHeader(
    'access-control-allow-headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  return next();
});

app.get('/', (req, res) => {
  res.send('hello');
});

app.get('/state', async (req, res) => {
  try {
    const stateData = await getState();
    console.log(stateData);

    res.send({
      state: stateData
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: 'An Error occurred while fetchin the state'
    });
  }
});

async function getState() {
  try {
    const response = await fetch(
      'http://localhost:8123/api/states/button.gledopto_gl_mc_001p_identify',
      {
        method: 'GET',
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI1NjkxMjU3NDIzMDg0YWEyODliZDk1NzlkODZlYTBmMCIsImlhdCI6MTcwNTE0NDU5NiwiZXhwIjoyMDIwNTA0NTk2fQ.VaVUPHWmKdx3-byNxfBuNbtzd8IIQ8SwcI57JaP4Ex4',
          'content-type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// WEBSOCKET Temperature
// Läuft alle 5 sec
runTemperatureInterval(5000, (temperatureData) => {
  console.log(
    `Current Temperature: ${temperatureData.temperature} °C at: ${temperatureData.timestamp}`
  );

  // Broadcast to websocket clients
  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify(temperatureData));
    }
  });
});

// WebSocket server event handling
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Send initial data to the connected client, if needed
  // ws.send(JSON.stringify(initialData));

  // WebSocket message event handling
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
  });

  // WebSocket close event handling
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

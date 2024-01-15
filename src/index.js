import express from 'express';
import fetch from 'node-fetch';
import {
  getTemperatureData,
  runTemperatureInterval
} from './temperatureSensor.js';

const app = express();
const port = 3000;

/* const url =
  'http://192.168.0.27:8123/api/states/button.gledopto_gl_mc_001p_identify';
let headers = {
  Authorization:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI1NjkxMjU3NDIzMDg0YWEyODliZDk1NzlkODZlYTBmMCIsImlhdCI6MTcwNTE0NDU5NiwiZXhwIjoyMDIwNTA0NTk2fQ.VaVUPHWmKdx3-byNxfBuNbtzd8IIQ8SwcI57JaP4Ex4',
  'content-type': 'application/json'
}; */

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

app.get('/echo', (req, res) => {
  const cmd = req.query.comand ?? 'command not found';

  res.send({
    command: cmd
  });
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

// Run the interval with a 5-second duration for temperature readings
runTemperatureInterval(5000, (temperatureData) => {
  console.log(
    `Current Temperature: ${temperatureData.temperature} °C at: ${temperatureData.timestamp}`
  );
});

app.listen(port, () => {
  console.log(`States available on ${port}`);
});

/* app.post('/command', (req, res) => {
  const { body } = req;
  console.log(body);
  //commands.push(body);
  res.send({
    status: 'ok'
  });
}); */

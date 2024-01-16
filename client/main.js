/* document.onload = async () => {
    const response = await fetch('localhost:3000/command'), {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        command: 'ping'
    })
    }
} */

/* async function getWeather() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
} */

const element = document.getElementById('temperatureChart');

// Properties
const animation = {
  duration: 2000, //milisec
  timingFunction: 'ease-in-out',
  iterations: 1,
  delay: 0
};

// Define the keyframes for the animation
const keyframes = [
  { transform: 'translateX(0)' },
  { transform: 'translateX(100px)' },
  { transform: 'translateX(0)' }
];

const myAnimation = element.animate(keyframes, animation);

// Start the animation
myAnimation.play();

document.getElementById('getStateBtn').addEventListener('click', getState);

async function getState() {
  try {
    const response = await fetch('http://localhost:3000/state');
    const stateData = await response.json();
    displayStateData(stateData.state);
  } catch (error) {
    console.error('Error fetching state data:', error);
  }
}

function displayStateData(stateData) {
  const stateDisplayElement = document.getElementById('show-state');
  stateDisplayElement.textContent = JSON.stringify(stateData, null, 2);
  console.log('erhaltene StateData: ' + stateData);
}

// Funktion zum Herstellen einer Verbindung zum WebSocket-Server
function connectToServer(url) {
  const socket = new WebSocket(url);

  socket.addEventListener('open', (event) => {
    console.log('Connected to WebSocket server.');
  });

  socket.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    updateLEDs(data.ledStates);
    updatePirSensors(data.pirStates);
    updateButtons(data.buttonStates);
  });

  socket.addEventListener('close', (event) => {
    console.log('Disconnected from WebSocket server.');
  });

  return socket;
}

/* function updateBackgroundColor(temperature) {
  if (temperature < 0) {
    document.body.style.backgroundColor = '#003399'; // Light blue
  } else if (temperature <= 10) {
    document.body.style.backgroundColor = '#0000cc'; // Dark blue
  } else if (temperature <= 20) {
    document.body.style.backgroundColor = '#008000'; // Green
  } else {
    document.body.style.backgroundColor = '#ffffff'; // White
  }
} */

document.onload = async () => {
    const response = await fetch('localhost:3000/command'), {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        command: 'ping'
    })
    }
}

document.getElementById('getWeatherBtn').addEventListener('click', getWeather);

async function getWeather() {
    

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Select the element you want to add animation to
const element = document.getElementById("temperatureChart");

// Define the animation properties
const animation = {
  duration: 2000, // Duration of the animation in milliseconds
  timingFunction: "ease-in-out", // Timing function of the animation
  iterations: 1, // Number of times the animation should repeat
  delay: 0, // Delay before the animation starts
};

// Define the keyframes for the animation
const keyframes = [
  { transform: "translateX(0)" },
  { transform: "translateX(100px)" },
  { transform: "translateX(0)" },
];

// Create the animation object
const myAnimation = element.animate(keyframes, animation);

// Start the animation
myAnimation.play();


document.getElementById('getStateBtn').addEventListener('click', getState);

async function getState(){
  try {

    const response = await fetch('localhost:3000/state');
    const stateData = await response.json();
    console.log("erhaltene StateData: "+stateData)
    document.getElementById('show-state').innerHTML = stateData;
} catch (error) {
    console.error('Error fetching state data:', error);
}
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

// Stellen Sie eine Verbindung zum WebSocket-Server her
const socket = connectToServer('ws://your-websocket-server-url');

showToast('This is a toast message!');   


function updateBackgroundColor(temperature) {
    if (temperature < 0) {
      document.body.style.backgroundColor = '#003399'; // Light blue
    } else if (temperature <= 10) {
      document.body.style.backgroundColor = '#0000cc'; // Dark blue
    } else if (temperature <= 20) {
      document.body.style.backgroundColor = '#008000'; // Green
    } else {
      document.body.style.backgroundColor = '#ffffff'; // White
    }
  }
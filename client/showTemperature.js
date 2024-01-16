/*     // Generate data for temperature chart
    let labels = [];
    let data = [];
    for (let i = 0; i < 30; i++) {
        labels.push('');
        data.push(Math.floor(Math.random() * 40) - 30);     
    }*/

document.addEventListener('DOMContentLoaded', function () {
  // Create temperature chart
  let ctx = document.getElementById('temperatureChart').getContext('2d');
  let chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {
          label: 'Temperature',
          data: [],
          borderColor: 'white',
          borderWidth: 1,
          backgroundColor: 'white'
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: false,
          min: -10,
          max: 40
        }
      }
    }
  });

  // Establish WebSocket connection
  const socket = new WebSocket('ws://localhost:3000');

  socket.addEventListener('open', function (event) {
    console.log('WebSocket connection opened');
  });

  socket.addEventListener('message', (event) => {
    const temperatureData = JSON.parse(event.data);
    console.log('Received temperature data:', temperatureData);

    // Update
    let timestampShort = temperatureData.timestamp;
    timestampShort =
      timestampShort.slice(0, 10) + ' ' + timestampShort.slice(11, 19);
    chart.data.labels.push(timestampShort);
    chart.data.datasets[0].data.push(temperatureData.temperature);

    // Limit datapoints
    const maxDataPoints = 100;
    if (chart.data.labels.length > maxDataPoints) {
      chart.data.labels.shift();
      chart.data.datasets[0].data.shift();
    }

    // Update the chart
    chart.update();

    /*     // Display a toast message
    showToast(
      `New Temperature Data: ${temperatureData.temperature} °C at ${temperatureData.timestamp}`
    ); */
  });

  // Handle WebSocket errors
  socket.addEventListener('error', (error) => {
    console.error('WebSocket error:', error);
  });

  // Handle WebSocket close event
  socket.addEventListener('close', () => {
    console.log('WebSocket connection closed');
  });
});

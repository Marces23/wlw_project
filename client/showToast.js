function createToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
  
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }
  
  // Example usage
  createToast('This is a toast message!');

  document.getElementById('getWeatherBtn').addEventListener('click', () => {
    // Your existing code for getting the weather
  
    // Extract the temperature value from the weather data
    const temperature = weatherData.current.temp;
  
    // Update the background color based on the temperature
    updateBackgroundColor(temperature);
  
    // Display the toast message after getting the weather
    createToast('Weather information has been updated!');
  });
 

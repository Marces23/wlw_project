/* import express from 'express';

const app = express();
const port = 3000;

//app.get('/',req result)

url = "http://192.168.0.27:8123/api/states/button.gledopto_gl_mc_001p_identify"
headers = {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI1NjkxMjU3NDIzMDg0YWEyODliZDk1NzlkODZlYTBmMCIsImlhdCI6MTcwNTE0NDU5NiwiZXhwIjoyMDIwNTA0NTk2fQ.VaVUPHWmKdx3-byNxfBuNbtzd8IIQ8SwcI57JaP4Ex4",
    "content-type": "application/json",
}

response = get(url, headers=headers)
print(response.text) */

/* // In your main.js file or a similar script
async function getHomeAssistantData() {
    // long-lived-acces token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI1NjkxMjU3NDIzMDg0YWEyODliZDk1NzlkODZlYTBmMCIsImlhdCI6MTcwNTE0NDU5NiwiZXhwIjoyMDIwNTA0NTk2fQ.VaVUPHWmKdx3-byNxfBuNbtzd8IIQ8SwcI57JaP4Ex4
    try {
        const response = await fetch('http://127.0.0.1:8123/api/states/light.gledopto_gl_mc_001p_light');
        const data = await response.json();

        // Do something with the data, e.g., update the DOM
        console.log(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Call the function to fetch data when the page loads
getHomeAssistantData();

curl \
 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI1NjkxMjU3NDIzMDg0YWEyODliZDk1NzlkODZlYTBmMCIsImlhdCI6MTcwNTE0NDU5NiwiZXhwIjoyMDIwNTA0NTk2fQ.VaVUPHWmKdx3-byNxfBuNbtzd8IIQ8SwcI57JaP4Ex4" \
 -H "Content-Type: application/json" \
  http://127.0.0.1:8123/api/states */

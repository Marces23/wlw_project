import express from 'express';

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

app.get('/', (req, res) => {
  res.send('hello');
});

app.get('/echo', (req, res) => {
  const cmd = req.query.comand ?? 'command not found';

  res.send({
    command: cmd
  });
});

app.listen(port, () => {
  console.log(`Linux Commands available on ${port}`);
});

app.get('/state', (req, res) => {
  state = getState();
  res.send({
    state: response.text
  });
});

async function getState() {
  fetch(
    'http://192.168.0.27:8123/api/states/button.gledopto_gl_mc_001p_identify',
    {
      method: 'GET',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI1NjkxMjU3NDIzMDg0YWEyODliZDk1NzlkODZlYTBmMCIsImlhdCI6MTcwNTE0NDU5NiwiZXhwIjoyMDIwNTA0NTk2fQ.VaVUPHWmKdx3-byNxfBuNbtzd8IIQ8SwcI57JaP4Ex4',
        'content-type': 'application/json'
      }
    }
  )
    .then((response) => response.json())
    .then((data) => {
      // handle the response data here
      console.log(data);
      return data;
    })
    .catch((error) => {
      // handle any errors here
      console.error(error);
    });
}

/* app.post('/command', (req, res) => {
  const { body } = req;
  console.log(body);
  //commands.push(body);
  res.send({
    status: 'ok'
  });
}); */

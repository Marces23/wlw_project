import express from 'express';

app.use(express.json());

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('hello');
});

app.get('/echo', (req, res) => {
  const cmd = req.query.comand ?? 'command not found';
  
  res.send({
    command: cmd,
    });
});

app.listen(port, () => {
  console.log(`Linux Commands available on ${port}`);
});

app.get('/state', (req, res) => {
  response = app.get(url, headers=headers)
  
  res.send({
    state: response.text,
    });
});

url = "http://192.168.0.27:8123/api/states/button.gledopto_gl_mc_001p_identify"
headers = {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI1NjkxMjU3NDIzMDg0YWEyODliZDk1NzlkODZlYTBmMCIsImlhdCI6MTcwNTE0NDU5NiwiZXhwIjoyMDIwNTA0NTk2fQ.VaVUPHWmKdx3-byNxfBuNbtzd8IIQ8SwcI57JaP4Ex4",
    "content-type": "application/json",
}

response = app.get(url, headers=headers)
print(response.text)


app.post('/command', (req, res) => {
  const { body } = req;
  console.log(body);
  //commands.push(body);
  res.send({
    status: 'ok'
  })
});


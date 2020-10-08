const express = require('express');
const tasks = require('./api/tasks');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require('path');

let port = process.env.PORT;

if (!port) {
  port = 8000;
}

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '/../build')));

app.get('/', (req, res) => {
  res.status(404).json({
    message: 'Not found'
  });
});

app.use('/tasks', tasks);

app.get('/grid', (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, '/../build')})
});

app.get('/canban', (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, '/../build')})
});

app.get('/schedule', (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, '/../build')})
});

app.listen(port);

const express = require('express');
const tasks = require('./api/tasks');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

let port = process.env.PORT;

if (!port) {
  port = 8000;
}

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(404).json({
    message: 'Not found'
  });
});

app.use('/tasks', tasks);

app.listen(port);

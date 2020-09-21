const express = require('express');
const tasks = require('./api/tasks');

const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
  res.status(404).json({
    message: 'Not found' 
  });
});

app.use('/tasks', tasks);

app.listen(PORT);

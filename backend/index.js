const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const webSocket = require('ws');
const data = require('./data.json');

const app = express();
const server = http.createServer(app);

const wss = new webSocket.Server({
  server,
  keepalive: true,
  keepaliveGracePeriod: 6000 * 100, // ms
});

wss.on('connection', ws => {
  ws.on('error', err => {
    console.error(err);
  });

  ws.on('message', () => {
    wss.clients.forEach(client => client.send(JSON.stringify(data.tasks)));
  });
});

let port = process.env.PORT;

if (!port) {
  port = 3030;
}

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '/../build')));

app.get('/', (req, res) => {
  res.status(404).json({
    message: 'Not found'
  });
});

app.get('/tasks', (req, res) => {
  try {
    res.status(200).json(data.tasks);
  } catch (err) {
    res.status(500).json({
      message: 'Error'
    });
  }
});

app.post('/tasks', (req, res) => {
  try {
    const newTask = req.body;
    const tasks = data.tasks;

    const newModifiedTask = { ...newTask, id: tasks.length, date: newTask.date ? new Date(newTask.date).toISOString() : '' };

    tasks.push(newModifiedTask);

    res.status(201).json({
      message: 'New task successfully created',
      newTask: newModifiedTask
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error'
    });
  }
});

app.patch('/tasks/:id', (req, res) => {
  try {
    let newTask = req.body;

    data.tasks = data.tasks.map(task => {
      if (task.id === Number(req.params.id)) {
        const isDonePropEmpty = newTask.isDone === undefined;
        if (!newTask.status && !isDonePropEmpty && newTask.isDone !== task.isDone) {
          newTask.status = newTask.isDone ? 'done' : 'toDo';
        }
        newTask = { ...task, ...newTask };
        newTask.date = newTask.date ? new Date(newTask.date).toISOString() : '';

        return newTask;
      }
      return task;
    });
    console.log(newTask, data)
    res.status(200).json({
      message: 'Task successfully updated',
      updatedTask: newTask
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error'
    });
  }
});

app.delete('/tasks/:id', (req, res) => {
  try {
    const taskId = Number(req.params.id);

    data.tasks.splice(taskId, 1);
    data.tasks = data.tasks.map((task, i) => ({ ...task, id: i }));

    res.status(200).json({
      message: 'Task successfully deleted',
      deletedTaskId: taskId
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error'
    });
  }
});

app.get('/grid', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '/../build') })
});

app.get('/canban', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '/../build') })
});

app.get('/schedule', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '/../build') })
});

server.listen(port);

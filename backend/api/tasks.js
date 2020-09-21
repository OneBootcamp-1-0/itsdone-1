const { Router } = require('express');
const fs = require('fs');

const dataPath = 'backend/data.json';
const router = Router();

router.get('/', (req, res) => {
  try {
    const jsonData = fs.readFileSync(dataPath);
    const tasks = JSON.parse(jsonData).tasks;

    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({
      message: 'Error'
    });
  }
});

router.post('/', (req, res) => {
  try {
    const newTask = req.body;
    const jsonData = fs.readFileSync(dataPath);
    const data = JSON.parse(jsonData);
    const tasks = data.tasks;

    tasks.push({...newTask, id: tasks.length});

    fs.writeFileSync(dataPath, JSON.stringify(data));

    res.status(201).json({
      message: 'New task successfully created',
      tasks: tasks
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error'
    });
  }
});

router.patch('/:id', (req, res) => {
  try {
    const newTask = req.body;
    const jsonData = fs.readFileSync(dataPath);
    const data = JSON.parse(jsonData);

    data.tasks = data.tasks.map(task => {
      return task.id === Number(req.params.id) ? newTask : task;
    });

    fs.writeFileSync(dataPath, JSON.stringify(data));

    res.status(200).json({
      message: 'Task successfully updated',
      tasks: data.tasks
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error'
    });
  }
});

module.exports = router;

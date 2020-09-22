const { Router } = require('express');
const data = require('../data.json');

const router = Router();

router.get('/', (req, res) => {
  try {
    res.status(200).json(data.tasks);
  } catch (err) {
    res.status(500).json({
      message: 'Error'
    });
  }
});

router.post('/', (req, res) => {
  try {
    const newTask = req.body;
    const tasks = data.tasks;

    tasks.push({...newTask, id: tasks.length});

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

    data.tasks = data.tasks.map(task => {
      return task.id === Number(req.params.id) ? newTask : task;
    });

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

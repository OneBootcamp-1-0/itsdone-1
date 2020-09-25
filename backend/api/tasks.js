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

router.patch('/:id', (req, res) => {
  try {
    let newTask = req.body;

    newTask.date = newTask.date ? new Date(newTask.date).toISOString() : '';

    data.tasks = data.tasks.map(task => {
      if (task.id === Number(req.params.id)) {
        newTask = { ...task, ...newTask };
        return newTask;
      }
      return task;
    });

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

module.exports = router;

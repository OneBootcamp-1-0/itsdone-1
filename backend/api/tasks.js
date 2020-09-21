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
    console.error(err);

    res.status(500).json({
      message: 'Error'
    });
  }
});

module.exports = router;

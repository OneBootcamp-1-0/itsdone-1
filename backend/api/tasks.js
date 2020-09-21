const { Router } = require('express');
const fs = require('fs');

const router = Router();

router.get('/', (req, res) => {
  try {
    const jsonData = fs.readFileSync(`backend/data.json`);
    const data = JSON.parse(jsonData);

    res.status(200).json(data.tasks);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: 'Error'
    });
  }
});

module.exports = router;

const router = require('express').Router();
const path = require('path');

const readFile = require('../utils/readFile.js');

const jsonDataPath = path.join(__dirname, '..', 'data', 'cards.json');

/** Обработка запроса карточек */
router.get('/cards', (req, res) => {
  readFile(jsonDataPath)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Ошибка на сервере' });
    });
});

module.exports = router;

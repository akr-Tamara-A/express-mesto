const router = require('express').Router();
const path = require('path');

const readFile = require('../utils/readFile.js');

const jsonDataPath = path.join(__dirname, '..', 'data', 'users.json');

/** Обработка запроса всех пользователей */
router.get('/users', (req, res) => {
  readFile(jsonDataPath)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Ошибка на сервере' });
    });
});

/** Обработка запроса отдельного пользователя */
router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  readFile(jsonDataPath)
    .then((data) => {
      const requestedUser = data.find((user) => user._id === id);
      if (!requestedUser) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      res.send(requestedUser);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Ошибка на сервере' });
    });
});

module.exports = router;

const router = require('express').Router();

const usersRouter = require('./users');
const cardsRouter = require('./cards');

/** Обработка запросов пользователя */
router.use('/', usersRouter);

/** Временная авторизация */
router.use((req, res, next) => {
  req.user = {
    _id: '5f968b0a9748dd1cc0d19487',
  };

  next();
});

/** Обработка запросов карточек */
router.use('/', cardsRouter);

/** Обработка неправильного запроса */
router.use((req, res, next) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
  next();
});

module.exports = router;

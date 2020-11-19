const router = require('express').Router();

const { createUser, loginUser } = require('../controllers/users');
const usersRouter = require('./users');
const cardsRouter = require('./cards');

/** Временная авторизация */
router.use((req, res, next) => {
  req.user = {
    _id: '5f96c454cc867f18e45ecb91',
  };

  next();
});

/** Обработка логина пользователя */
router.post('/signin', loginUser);

/** Обработка регистрации пользователя */
router.post('/signup', createUser);

/** Обработка запросов пользователя */
router.use('/', usersRouter);

/** Обработка запросов карточек */
router.use('/', cardsRouter);

/** Обработка неправильного запроса */
router.use((req, res, next) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
  next();
});

module.exports = router;

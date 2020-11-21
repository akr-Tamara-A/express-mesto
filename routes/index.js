const router = require('express').Router();

const { createUser, loginUser } = require('../controllers/users');
const usersRouter = require('./users');
const cardsRouter = require('./cards');

const auth = require('../middlewares/auth');

/** Обработка логина пользователя */
router.post('/signin', loginUser);

/** Обработка регистрации пользователя */
router.post('/signup', createUser);

/** Мидлвэр для авторизации пользователя */
router.use(auth);

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

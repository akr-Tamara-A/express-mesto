const router = require('express').Router();

const { getUsers, getUser, createUser } = require('../controllers/users');

/** Обработка запроса всех пользователей */
router.get('/users', getUsers);

/** Обработка запроса отдельного пользователя */
router.get('/users/:id', getUser);

/** Создание пользователя */
router.post('/users', createUser);

module.exports = router;

const router = require('express').Router();

const {
  getUsers,
  getUser,
  createUser,
  deleteUser,
} = require('../controllers/users');

/** Обработка запроса всех пользователей */
router.get('/users', getUsers);

/** Обработка запроса отдельного пользователя */
router.get('/users/:id', getUser);

/** Создание пользователя */
router.post('/users', createUser);

/** Обработка удаления отдельного пользователя */
router.delete('/users/:id', deleteUser);

module.exports = router;

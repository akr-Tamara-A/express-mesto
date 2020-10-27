const router = require('express').Router();

const {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  patchUser,
  patchUserAvatar,
} = require('../controllers/users');

/** Обработка запроса всех пользователей */
router.get('/users', getUsers);

/** Обработка запроса отдельного пользователя */
router.get('/users/:id', getUser);

/** Создание пользователя */
router.post('/users', createUser);

/** Обработка удаления отдельного пользователя */
router.delete('/users/:id', deleteUser);

/** Обработка редактирования профиля пользователя */
router.patch('/users/:id/me', patchUser);

/** Обработка изменения аватара пользователя */
router.patch('/users/:id/me/avatar', patchUserAvatar);

module.exports = router;

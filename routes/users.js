const router = require('express').Router();

const {
  getUsers,
  getUser,
  patchUser,
  patchUserAvatar,
} = require('../controllers/users');

/** Обработка запроса всех пользователей */
router.get('/users', getUsers);

/** Обработка запроса отдельного пользователя */
router.get('/users/me', getUser);

/** Обработка запроса отдельного пользователя */
router.get('/users/:id', getUser);

/** Обработка редактирования профиля пользователя */
router.patch('/users/me', patchUser);
// router.patch('/users/:id/me', patchUser);

/** Обработка изменения аватара пользователя */
router.patch('/users/me/avatar', patchUserAvatar);
// router.patch('/users/:id/me/avatar', patchUserAvatar);

module.exports = router;

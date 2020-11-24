const router = require('express').Router();

const {
  getCards,
  deleteCard,
  createCard,
  getCard,
  addLike,
  deleteLike,
} = require('../controllers/cards');

const {
  cardValidation,
  idValidation,
} = require('../middlewares/validation');

/** Обработка запроса всех карточек */
router.get('/cards', getCards);

/** Создание карточки */
router.post('/cards', cardValidation, createCard);

/** Обработка запроса отдельной карточки */
router.get('/cards/:cardId', idValidation, getCard);

/** Обработка удаления отдельной карточки */
router.delete('/cards/:cardId', idValidation, deleteCard);

/** Обработка добавления лайка карточке */
router.put('/cards/:cardId/likes', idValidation, addLike);

/** Обработка удаления лайка карточке */
router.delete('/cards/:cardId/likes', idValidation, deleteLike);

module.exports = router;

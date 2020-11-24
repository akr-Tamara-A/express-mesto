const router = require('express').Router();

const {
  getCards,
  deleteCard,
  createCard,
  getCard,
  addLike,
  deleteLike,
} = require('../controllers/cards');

/** Обработка запроса всех карточек */
router.get('/cards', getCards);

/** Создание карточки */
router.post('/cards', createCard);

/** Обработка запроса отдельной карточки */
router.get('/cards/:cardId', getCard);

/** Обработка удаления отдельной карточки */
router.delete('/cards/:cardId', deleteCard);

/** Обработка добавления лайка карточке */
router.put('/cards/:cardId/likes', addLike);

/** Обработка удаления лайка карточке */
router.delete('/cards/:cardId/likes', deleteLike);

module.exports = router;

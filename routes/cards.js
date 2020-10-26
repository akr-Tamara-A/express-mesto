const router = require('express').Router();

const {
  getCards,
  deleteCard,
  createCard,
  getCard,
} = require('../controllers/cards');

/** Обработка запроса всех карточек */
router.get('/cards', getCards);

/** Создание карточки */
router.post('/cards', createCard);

/** Обработка удаления отдельной карточки */
router.delete('/cards/:cardId', deleteCard);

/** Обработка удаления отдельной карточки */
router.get('/cards/:cardId', getCard);

module.exports = router;

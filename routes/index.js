const router = require('express').Router();

const usersRouter = require('./users');
const cardsRouter = require('./cards');

/** Обработка запросов */
router.use('/', usersRouter);
router.use('/', cardsRouter);

module.exports = router;

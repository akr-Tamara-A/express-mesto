const express = require('express');
const path = require('path');

const userRoutes = require('./routes/users.js');
const cardsRoutes = require('./routes/cards.js');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

/** Обработка запросов */
app.use('/', userRoutes);
app.use('/', cardsRoutes);

/** Обработка неправильного запроса */
app.use((req, res, next) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
  next();
});

/** Слушатель порта */
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

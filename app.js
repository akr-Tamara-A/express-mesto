const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const routes = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

/** подключаемся к серверу mongo */
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(express.static(path.join(__dirname, 'public')));

/** Обработка запросов */
app.use(routes);

/** Обработка неправильного запроса */
app.use((req, res, next) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
  next();
});

/** Слушатель порта */
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

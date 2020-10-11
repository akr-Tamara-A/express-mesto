const express = require('express');
const path = require('path');

const routes = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

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

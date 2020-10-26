const Card = require('../models/card');

module.exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.send({ data: cards });
  } catch (error) {
    res.status(500).send({ message: 'Ошибка на сервере' });
  }
};

module.exports.getCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) res.status(400).send({ message: 'Такая карта не существует' });
    res.send({ data: card });
  } catch (error) {
    res.status(500).send({ message: 'Ошибка на сервере' });
  }
};

module.exports.createCard = async (req, res) => {
  try {
    const newCard = new Card({ ...req.body, owner: req.user._id });

    const error = newCard.validateSync();
    if (error) {
      const errorMessage = error.message;
      res.status(400).send({ message: errorMessage });
    }

    await newCard.save();
    res.send({ data: newCard });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndRemove(req.params.id);
    if (!card) res.status(400).send({ message: 'Такая карта не существует' });
    res.send({ data: card });
  } catch (error) {
    res.status(500).send({ message: 'Ошибка на сервере' });
  }
};

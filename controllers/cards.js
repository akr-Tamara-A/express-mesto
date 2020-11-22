const Card = require('../models/card');

/** Контролер запроса всех карточек */
module.exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({}).populate('user');
    res.send({ data: cards });
  } catch (error) {
    res.status(500).send({ message: 'Ошибка на сервере' });
  }
};

/** Контролер запроса одной карточки */
module.exports.getCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      res.status(404).send({ message: 'Такая карта не существует' });
    } else {
      res.send({ data: card });
    }
  } catch (error) {
    res.status(404).send({ message: 'Неподходящий формат ID карточки' });
  }
};

/** Контролер создания новой карточки */
module.exports.createCard = async (req, res) => {
  try {
    const newCard = new Card({ ...req.body, owner: req.user._id });

    const error = newCard.validateSync();
    if (error) {
      const errorMessage = error.message;
      res.status(400).send({ message: errorMessage });
    } else {
      await newCard.save();
      res.send({ data: newCard });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

/** Контролер удаления карточки */
module.exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.cardId).populate('user');
    if (!card) {
      res.status(404).send({ message: 'Такая карта не существует' });
    } else {
      const user = req.user._id;
      const cardOwner = JSON.stringify(card.owner).slice(1, -1);

      if (user !== cardOwner) {
        res.status(403).send({ message: 'Это чужая карта' });
      } else {
        const cardForDel = await Card.findByIdAndRemove({ _id: req.params.cardId });
        res.send({ data: cardForDel });
      }
    }
  } catch (error) {
    res.status(404).send({ message: 'Неподходящий формат ID карточки' });
  }
};

/** Контролер добавления лайка карточке */
module.exports.addLike = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      res.status(404).send({ message: 'Такая карта не существует' });
    } else {
      res.send({ data: card });
    }
  } catch (error) {
    res.status(404).send({ message: 'Неподходящий формат ID карточки' });
  }
};

/** Контролер добавления лайка карточке */
module.exports.deleteLike = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    );
    if (!card) {
      res.status(404).send({ message: 'Такая карта не существует' });
    } else {
      res.send({ data: card });
    }
  } catch (error) {
    res.status(404).send({ message: 'Неподходящий формат ID карточки' });
  }
};

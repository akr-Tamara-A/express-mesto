const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { genereteToken } = require('../utils/genereteToken');

/** Контролер запроса всех пользователей */
module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send({ data: users });
  } catch (error) {
    res.status(500).send({ message: 'Ошибка на сервере' });
  }
};

/** Контролер запроса пользователя */
module.exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('+password');

    if (!user) {
      res.status(404).send({ message: 'Такой пользователь не существует' });
    } else {
      res.send({ data: user });
    }
  } catch (error) {
    res.status(404).send({ message: 'Неподходящий формат ID' });
  }
};

/** Контролер создания нового пользователя */
module.exports.createUser = async (req, res) => {
  const { email, password } = req.body;
  if (!password) {
    res.status(400).send({ message: 'Невалидные данные' });
    return;
  }
  try {
    const hash = await bcrypt.hash(password, 10);

    const newUser = await new User({
      email,
      password: hash,
    }, (err) => Promise.reject(new Error(err)));

    const validateError = newUser.validateSync();

    if (validateError) {
      res.status(400).send({ message: validateError.message });
    } else {
      await newUser.save();
      res.send({ data: newUser });
    }
  } catch (error) {
    if (error.name === 'MongoError') {
      res.status(409).send({ message: 'Такой email уже используется' });
    } else {
      res.status(500).send({ message: 'Ошибка на сервере' });
    }
  }
};

/** Контролер логина пользователя */
module.exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: genereteToken(user._id),
      });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

/** Контролер удаления пользователя */
module.exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);

    if (!user) {
      res.status(404).send({ message: 'Такой пользователь не существует' });
    } else {
      res.send({ data: user });
    }
  } catch (error) {
    res.status(404).send({ message: 'Неподходящий формат ID' });
  }
};

/** Контролер редактирования данных пользователя */
module.exports.patchUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
    );

    if (!user) {
      res.status(404).send({ message: 'Такой пользователь не существует' });
    } else {
      res.send({ data: user });
    }
  } catch (error) {
    res.status(500).send({ message: 'Ошибка на сервере' });
  }
};

/** Контролер редактирования аватара пользователя */
module.exports.patchUserAvatar = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
    );

    if (!user) {
      res.status(404).send({ message: 'Такой пользователь не существует' });
    } else {
      res.send({ data: user });
    }
  } catch (error) {
    res.status(500).send({ message: 'Ошибка на сервере' });
  }
};

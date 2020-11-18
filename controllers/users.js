const bcrypt = require('bcryptjs');
const User = require('../models/user');

/** Контролер запроса всех пользователей */
module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send({ data: users });
  } catch (error) {
    res.status(500).send({ message: 'Ошибка на сервере' });
  }
};

/** Контролер запроса одного пользователя */
module.exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

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
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const newUser = await new User({
      ...req.body,
      password: hash,
    }, (err) => Promise.reject(new Error(err)));

    const validateError = newUser.validateSync();
    if (validateError) {
      const errorMessage = validateError.message;
      res.status(400).send({ message: errorMessage });
    } else {
      await newUser.save();
      res.send({ data: newUser });
    }
  } catch (error) {
    if (error.name === 'MongoError') {
      res.status(400).send({ message: 'Такой email уже используется' });
    } else {
      res.status(500).send({ message: 'Ошибка на сервере' });
    }
  }
};

module.exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        Promise.reject(new Error('Неправильные почта или пароль'));
      }

      bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        Promise.reject(new Error('Неправильные почта или пароль'));
      }

      res.send({ message: 'Всё верно!' });
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

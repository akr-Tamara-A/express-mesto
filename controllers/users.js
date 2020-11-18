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
    // await User.init();

    // const init = await User.init();
    // if (init) {
    //   console.log('init');
    //   console.log(init);
    // }
    const newUser = await new User({
      ...req.body,
      password: hash,
    });
    // const newUser = new User({
    //   ...req.body,
    //   password: hash,
    // });

    const error = newUser.validateSync();
    if (error) {
      const errorMessage = error.message;
      res.status(400).send({ message: errorMessage });
    } else {
      await newUser.save();
      res.send({ data: newUser });
    }
  } catch (error) {
    // console.log(error);
    // console.log(error.codeName);
    // if (error.codeName === 'DublicateKey') {
    //   res.status(400).send({ message: 'Такой email уже используется' });
    // } else {
      res.status(500).send({ message: 'Ошибка на сервере' });
    // }
  }
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

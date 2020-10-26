const User = require('../models/user');

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send({ data: users });
  } catch (error) {
    res.status(500).send({ message: 'Ошибка на сервере' });
  }
};

module.exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) res.status(400).send({ message: 'Такой пользователь не существует' });

    res.send({ data: user });
  } catch (error) {
    res.status(500).send({ message: 'Ошибка на сервере' });
  }
};

module.exports.createUser = async (req, res) => {
  try {
    const newUser = new User({ ...req.body });

    const error = newUser.validateSync();
    if (error) {
      const errorMessage = error.message;
      res.status(400).send({ message: errorMessage });
    }

    await newUser.save();
    res.send({ data: newUser });
  } catch (error) {
    res.status(500).send({ message: 'Ошибка на сервере' });
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);

    if (!user) res.status(400).send({ message: 'Такой пользователь не существует' });

    res.send({ data: user });
  } catch (error) {
    res.status(500).send({ message: 'Ошибка на сервере' });
  }
};

const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
// const isURL = require('validator/lib/isURL');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Слишком короткое название'],
    maxlength: [30, 'Слишком длинное название'],
    required: false,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'Слишком короткое название'],
    maxlength: [30, 'Слишком длинное название'],
    required: false,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    match: [/^https?:\/\/\w+#?/gi, 'Неправильная ссылка'],
    required: false,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    // validate: {
    //   validator: (value) => isURL(value),
    //   message: (props) => `${props.value} невалидный!`,
    // },
  },
  email: {
    type: String,
    required: [true, 'Обязательное поле'],
    unique: [true, 'Такой email уже используется'],
    validate: {
      validator: (value) => isEmail(value),
      message: (props) => `${props.value} невалидный!`,
    },
  },
  password: {
    type: String,
    required: [true, 'Обязательное поле'],
    minlength: [8, 'Слишком короткий пароль'],
  },
});

module.exports = mongoose.model('user', userSchema);

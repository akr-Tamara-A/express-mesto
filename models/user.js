const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Слишком короткое название'],
    maxlength: [30, 'Слишком длинное название'],
    required: [true, 'Обязательное поле'],
  },
  about: {
    type: String,
    minlength: [2, 'Слишком короткое название'],
    maxlength: [30, 'Слишком длинное название'],
    required: [true, 'Обязательное поле'],
  },
  avatar: {
    type: String,
    match: [/^https?:\/\/\w+#?/gi, 'Неправильная ссылка'],
    required: [true, 'Обязательное поле'],
  },
});

module.exports = mongoose.model('user', userSchema);

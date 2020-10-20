const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    url: /https*:\/\/(w{3}\.)*[a-z0-9\-/.]+#*$/gi,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);

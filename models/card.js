const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  title: {
    name: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    name: String,
    link: /https*:\/\/(w{3}\.)*[a-z0-9\-/.]+#*$/gi,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: mongoose.Schema.Types.ObjectId, /* !!!!!!!! */
    default: [],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);

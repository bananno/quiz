const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

const Card = mongoose.model('Card', CardSchema);
module.exports = Card;

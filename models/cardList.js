const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardListSchema = new Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  cards: {},
});

const CardList = mongoose.model('CardList', CardListSchema);
module.exports = CardList;

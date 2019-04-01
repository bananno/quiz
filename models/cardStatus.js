const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardStatusSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  card: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Card',
    required: true,
  },
  list: {
    type: String,
    required: true,
  },
});

const CardStatus = mongoose.model('CardStatus', CardStatusSchema);
module.exports = CardStatus;

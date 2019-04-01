const Card = require('../models/card');
const defaultCards = require('../defaultDatabase/index');

function getCards(req, res, next, selector, callback) {
  Card.find(selector).populate('owner').exec((error, databaseCards) => {
    if (error) {
      return next(error);
    }

    let cards = [...databaseCards];

    if (selector.owner == null) {
      cards = [...databaseCards, ...defaultCards];
    }

    return callback(cards);
  });
}

module.exports = getCards;

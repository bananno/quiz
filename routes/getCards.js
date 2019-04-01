const Card = require('../models/card');

function getCards(req, res, next, selector, callback) {
  Card.find(selector, (error, cards) => {
    if (error) {
      return next(error);
    }

    return callback(cards);
  });
}

module.exports = getCards;

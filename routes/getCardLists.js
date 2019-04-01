const CardStatus = require('../models/cardStatus');

function getCardLists(req, res, next, user, callback) {
  CardStatus.find({ user: user }).exec((error, CardStatuses) => {
    if (error) {
      return next(error);
    }

    const cardLists = [];

    CardStatuses.forEach(status => {
      cardLists.push(status.list);
    });

    return callback(cardLists);
  });
}

module.exports = getCardLists;

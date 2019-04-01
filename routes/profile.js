const express = require('express');
const router = express.Router();
const getUser = require('./getUser');
const getCards = require('./getCards');
const getCardLists = require('./getCardLists');

router.get('/profile', (req, res, next) => {
  getUser(req, res, next, user => {
    getCards(req, res, next, { owner: user }, cards => {
      getCardLists(req, res, next, user, cardLists => {
          res.render('layout', {
            view: 'profile',
            title: 'Profile',
            cards: cards,
            cardLists: cardLists,
          });
      });
    });
  });
});

module.exports = router;

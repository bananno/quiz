const express = require('express');
const router = express.Router();
const getUser = require('./getUser');
const getCards = require('./getCards');

router.get('/profile', (req, res, next) => {
  getUser(req, res, next, user => {
    getCards(req, res, next, { owner: user }, cards => {
      res.render('layout', {
        view: 'profile',
        title: 'Profile',
        cards: cards,
      });
    });
  });
});

module.exports = router;

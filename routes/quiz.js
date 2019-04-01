const express = require('express');
const router = express.Router();
const Card = require('../models/card');
const getUser = require('./getUser');

router.get('/quiz', (req, res, next) => {
  getUser(req, res, next, user => {
    Card.find({ owner: user }, (error, cards) => {
      res.render('layout', {
        view: 'quiz',
        cards: cards,
        card: cards[0],
      });
    });
  });
});

module.exports = router;

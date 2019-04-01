const express = require('express');
const router = express.Router();
const Card = require('../models/card');
const getUser = require('./getUser');

router.get('/quiz', (req, res, next) => {
  res.redirect('/quiz/0');
});

router.get('/quiz/:index', (req, res, next) => {
  let index = parseInt(req.params.index || 0);
  getUser(req, res, next, user => {
    Card.find({ owner: user }, (error, cards) => {
      if (error) {
        return next(error);
      }

      if (!cards[index]) {
        return res.redirect('/profile');
      }

      res.render('layout', {
        view: 'quiz',
        cards: cards,
        card: cards[index],
        index: index,
      });
    });
  });
});

module.exports = router;

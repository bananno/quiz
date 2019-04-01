const express = require('express');
const router = express.Router();
const Card = require('../models/card');
const getUser = require('./getUser');

router.get('/newCard', (req, res, next) => {
  getUser(req, res, next, user => {
    res.render('layout', {
      view: 'newCard',
      title: 'New Card',
    });
  });
});

router.post('/newCard', (req, res, next) => {
  getUser(req, res, next, user => {
    const cardData = {
      question: req.body.question,
      answer: req.body.answer,
      owner: user,
    };

    if (!cardData.question || !cardData.answer) {
      const error = new Error('All fields are required.');
      error.status = 412;
      return next(error);
    }

    Card.create(cardData, (error, card) => {
      if (error) {
        return next(error);
      }

      return res.redirect('/profile');
    });
  });
});

module.exports = router;

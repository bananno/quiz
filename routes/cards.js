const express = require('express');
const router = express.Router();
const Card = require('../models/card');
const CardList = require('../models/cardList');
const getUser = require('./getUser');
const getCards = require('./getCards');

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

router.get('/newCardList', (req, res, next) => {
  getUser(req, res, next, user => {
    res.render('layout', {
      view: 'newCardList',
      title: 'New Card List',
    });
  });
});

router.post('/newCardList', (req, res, next) => {
  getUser(req, res, next, user => {
    const cardListData = {
      title: req.body.title,
      owner: user,
    };

    if (!cardListData.title) {
      const error = new Error('All fields are required.');
      error.status = 412;
      return next(error);
    }

    CardList.create(cardListData, (error, cardList) => {
      if (error) {
        return next(error);
      }

      return res.redirect('/profile');
    });
  });
});

router.get('/browse', (req, res, next) => {
  getUser(req, res, next, user => {
    getCards(req, res, next, {}, cards => {
      res.render('layout', {
        view: 'browse',
        title: 'Browse',
        cards: cards,
      });
    });
  });
});

module.exports = router;

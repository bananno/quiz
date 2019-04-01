const express = require('express');
const router = express.Router();
const Card = require('../models/card');
const CardStatus = require('../models/cardStatus');
const getUser = require('./getUser');
const getCards = require('./getCards');
const getCardLists = require('./getCardLists');

router.get('/newCard', (req, res, next) => {
  getUser(req, res, next, user => {
    getCardLists(req, res, next, user, cardLists => {
      res.render('layout', {
        view: 'newCard',
        title: 'New Card',
        cardLists: cardLists,
      });
    });
  });
});

router.post('/newCard', (req, res, next) => {
  getUser(req, res, next, user => {
    const question = req.body.question;
    const answer = req.body.answer;

    if (!question || !answer) {
      const error = new Error('Question and answer fields are required.');
      error.status = 412;
      return next(error);
    }

    let cardList = req.body.cardList;
    if (cardList == 'createNewCardList') {
      cardList = req.body.newCardList.trim();
    }

    const cardData = {
      question: question,
      answer: answer,
      owner: user,
    };

    Card.create(cardData, (error, card) => {
      if (error) {
        return next(error);
      }

      if (cardList == '') {
        return res.redirect('/profile');
      }

      const cardListData = {
        user: user,
        card: card,
        list: cardList,
      };

      CardStatus.create(cardListData, error => {
        if (error) {
          return next(error);
        }

        return res.redirect('/profile');
      });
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

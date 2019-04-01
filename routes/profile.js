const express = require('express');
const router = express.Router();
const getUser = require('./getUser');
const Card = require('../models/card');

router.get('/profile', (req, res, next) => {
  getUser(req, res, next, user => {
    Card.find({ owner: user }, (error, cards) => {
      if (error) {
        return next(error);
      }

      res.render('layout', {
        view: 'profile',
        title: 'Profile',
        cards: cards,
      });
    });
  });
});

module.exports = router;

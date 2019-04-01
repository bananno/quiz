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

module.exports = router;

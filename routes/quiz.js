const express = require('express');
const router = express.Router();
const Card = require('../models/card');
const getUser = require('./getUser');

router.get('/quiz', (req, res, next) => {
  getUser(req, res, next, user => {
    res.render('layout', {
      view: 'quiz',
    });
  });
});

module.exports = router;

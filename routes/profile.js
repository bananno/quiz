const express = require('express');
const router = express.Router();
const getUser = require('./getUser');

router.get('/profile', (req, res, next) => {
  getUser(req, res, next, user => {
    res.render('layout', {
      view: 'profile',
      title: 'Profile',
    });
  });
});

module.exports = router;

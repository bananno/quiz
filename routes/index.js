const express = require('express');
const router = express.Router();
const User = require('../models/user');
const getUser = require('./getUser');

router.get('/profile', getProfilePage);

router.get('/', (req, res, next) => {
  res.redirect('profile');
});

function getProfilePage(req, res, next) {
  getUser(req, res, next, user => {
    res.render('layout', {
      view: 'profile',
      title: 'Profile',
    });
  });
}

module.exports = router;

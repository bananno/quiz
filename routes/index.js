const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', getHomePage);
router.post('/login', loginUser);
router.post('/signup', signupUser);

function getHomePage(req, res, next) {
  res.render('index');
}

function loginUser(req, res, next) {
  res.redirect('/');
}

function signupUser(req, res, next) {
  const userData = {
    username: req.body.username,
    password: req.body.password,
  };

  if (!userData.username || !userData.password) {
    const error = new Error('All fields are required.');
    error.status = 412;
    return next(error);
  }

  res.redirect('/');
}

module.exports = router;

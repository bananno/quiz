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
  res.redirect('/');
}

module.exports = router;

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

  User.findOne({ username: userData.username }, (error, user) => {
    if (error) {
      return next(error);
    }

    if (user) {
      error = new Error('Username is already taken.');
      error.status = 412;
      return next(error);
    }

    User.create(userData, (error, user) => {
      if (error) {
        return next(error);
      }

      if (req.session) {
        req.session.userId = user._id;
      }

      return res.redirect('/');
    });
  });
}

module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/login', (req, res, next) => {
  res.render('layout', {
    view: 'login',
    title: 'Login',
  });
});

router.post('/login', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    const error = new Error('All fields are required.');
    error.status = 412;
    return next(error);
  }

  User.authenticate(username, password, (error, user) => {
    if (error) {
      return next(error);
    }

    if (!user) {
      error = new Error('Username or password is incorrect.');
      error.status = 412;
      return next(error);
    }

    req.session.userId = user._id;

    return res.redirect('/');
  });
});

router.post('/signup', (req, res, next) => {
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
});

router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.userId = null;
  }
  res.redirect('/login');
});

module.exports = router;

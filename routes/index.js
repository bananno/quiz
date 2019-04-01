const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', getHomePage);
router.get('/login', getLoginPage);
router.get('/logout', logoutUser);
router.get('/profile', getProfilePage);
router.post('/login', loginUser);
router.post('/signup', signupUser);

function getHomePage(req, res, next) {
  authenticate(req, res, next, user => {
    res.redirect('profile');
  });
}

function getLoginPage(req, res, next) {
  res.render('layout', {
    view: 'login',
    title: 'Login',
  });
}

function getProfilePage(req, res, next) {
  authenticate(req, res, next, user => {
    res.render('layout', {
      view: 'profile',
      title: 'Profile',
    });
  });
}

function loginUser(req, res, next) {
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

function authenticate(req, res, next, callback) {
  User.findById(req.session.userId, (error, user) => {
    if (error) {
      return next(error);
    }
    if (user) {
      res.locals.user = user;
      return callback(user);
    }
    return res.redirect('/login');
  });
}

function logoutUser(req, res, next) {
  if (req.session) {
    res.session = null;
  }
  res.redirect('/login');
}

module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', getHomePage);

function getHomePage(req, res, next) {
  res.render('index');
}

module.exports = router;

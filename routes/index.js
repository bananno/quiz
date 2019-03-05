const express = require('express');
const router = express.Router();

router.get('/', getHomePage);

function getHomePage(req, res, next) {
  res.render('index');
}

module.exports = router;

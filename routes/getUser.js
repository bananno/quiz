const User = require('../models/user');

function getUser(req, res, next, callback) {
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

module.exports = getUser;

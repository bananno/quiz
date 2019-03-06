const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre('save', next => {
  const user = this;
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

UserSchema.statics.authenticate = (username, password, next) => {
  User.findOne({ username: username }, (error, user) => {
    if (error) {
      return next(error);
    }

    if (!user) {
      error = new Error('User not found.');
      error.status = 401;
      return next(error);
    }

    bcrypt.compare(password, user.password, (error, result) => {
      if (result === true) {
        return next(user);
      }
      return next();
    });
  });
}

const User = mongoose.model('User', UserSchema);
module.exports = User;

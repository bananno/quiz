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

UserSchema.pre('save', function(next) {
  const user = this;
  UserSchema.hashPassword(user, next);
});

UserSchema.statics.hashPassword = (user, next) => {
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
};

UserSchema.statics.authenticate = (username, password, next) => {
  User.findOne({ username: username }, (error, user) => {
    if (error) {
      return next(error, null);
    }

    if (!user) {
      error = new Error('User not found.');
      error.status = 401;
      return next(error, null);
    }

    bcrypt.compare(password, user.password, (error, result) => {
      if (result === true) {
        return next(null, user);
      }
      error = new Error('Incorrect password.');
      error.status = 401;
      return next(error, null);
    });
  });
}

const User = mongoose.model('User', UserSchema);
module.exports = User;

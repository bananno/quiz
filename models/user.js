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

UserSchema.statics.authenticate = (username, password, callback) => {
  User.findOne({ username: username }, (error, user) => {
    if (error) {
      return callback(error);
    }

    if (!user) {
      error = new Error('User not found.');
      error.status = 401;
      return callback(error);
    }

    bcrypt.compare(password, user.password, (error, result) => {
      if (result === true) {
        return callback(user);
      }
      return callback();
    });
  });
}

const User = mongoose.model('User', UserSchema);
module.exports = User;

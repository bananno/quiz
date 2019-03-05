const expect = require('chai').expect;
const User = require('../models/user');

describe('User', function() {
  it('validation returns no error for valid object', function (done) {
    var user = new User({
      username: "samplename",
      password: "password123"
    });
    user.validate(err => {
      expect(err).to.be.null;
      done();
    });
  });

  it('should be invalid without username', function (done) {
    var user = new User();
    user.validate(err => {
      expect(err.errors.username).to.exist;
      done();
    });
  });
});

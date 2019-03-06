const expect = require('chai').expect;
const sinon = require('sinon');
const User = require('../models/user');

describe('User model validation', () => {
  it('validation returns no error for valid object', done => {
    const user = new User({
      username: 'samplename',
      password: 'password123'
    });
    user.validate(err => {
      expect(err).to.be.null;
      done();
    });
  });

  it('should be invalid without any attributes', done => {
    const user = new User();
    user.validate(err => {
      expect(err.errors.username).to.exist;
      done();
    });
  });

  it('should be invalid without username', done => {
    const user = new User({
      password: 'password123'
    });
    user.validate(err => {
      expect(err.errors.username).to.exist;
      done();
    });
  });

  it('should be invalid without password', done => {
    const user = new User({
      username: 'samplename'
    });
    user.validate(err => {
      expect(err.errors.password).to.exist;
      done();
    });
  });
});

describe('User model authentication', () => {
  beforeEach(() => {
    sinon.stub(User, 'findOne');
  });

  afterEach(() => {
    User.findOne.restore();
  });

  it('authenticates when user exists and password is correct', done => {
    const mockUser = new User({
      username: 'samplename',
      password: 'password123'
    });

    User.findOne.yields(null, mockUser);

    User.hashPassword(mockUser, () => {
      User.authenticate('samplename', 'password123', (error, user) => {
        expect(error).to.be.null;
        expect(user).to.exist;
        done();
      });
    });
  });

  it('does not authenticate when user exists but password is incorrect', done => {
    const mockUser = new User({
      username: 'samplename',
      password: 'password123'
    });

    User.findOne.yields(null, mockUser);

    User.hashPassword(mockUser, () => {
      User.authenticate('samplename', 'password12345', (error, user) => {
        expect(error.message).to.equal('Incorrect password.');
        expect(user).to.be.null;
        done();
      });
    });
  });

  it('does not authenticate when user does not exist', done => {
    User.findOne.yields(null, null);

    User.authenticate('samplename', 'password123', (error, user) => {
      expect(error.message).to.equal('User not found.');
      expect(user).to.be.null;
      done();
    });
  });
});

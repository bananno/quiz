const expect = require('chai').expect;
const sinon = require('sinon');
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('../routes/index');
const User = require('../models/user');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', router);

app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    error: err
  });
});

describe('Signup', () => {
  beforeEach(() => {
    sinon.stub(User, 'findOne');
    sinon.stub(User, 'create');
  });

  afterEach(() => {
    User.findOne.restore();
    User.create.restore();
  });

  it('fails when username is blank', done => {
    request(app)
      .post('/signup')
      .send({
        username: '',
        password: 'password123'
      })
      .expect(res => {
        sinon.assert.notCalled(User.findOne);
        sinon.assert.notCalled(User.create);
        const errorMsg = JSON.parse(res.error.text).message;
        expect(errorMsg).to.equal('All fields are required.');
      })
      .expect(412, done);
  });

  it('fails when password is blank', done => {
    request(app)
      .post('/signup')
      .send({
        username: 'samplename',
        password: ''
      })
      .expect(res => {
        sinon.assert.notCalled(User.findOne);
        sinon.assert.notCalled(User.create);
        const errorMsg = JSON.parse(res.error.text).message;
        expect(errorMsg).to.equal('All fields are required.');
      })
      .expect(412, done);
  });

  it('fails when username is already taken', done => {
    User.findOne.yields(null, {
      username: 'samplename'
    });

    request(app)
      .post('/signup')
      .send({
        username: 'samplename',
        password: 'password123'
      })
      .expect(res => {
        sinon.assert.calledOnce(User.findOne);
        sinon.assert.notCalled(User.create);
        const errorMsg = JSON.parse(res.error.text).message;
        expect(errorMsg).to.equal('Username is already taken.');
      })
      .expect(412, done);
  });

  it('succeeds with valid input', done => {
    User.findOne.yields(null, null);
    User.create.yields(null, {
      _id: '1234123123',
    });

    request(app)
      .post('/signup')
      .send({
        username: 'samplename',
        password: 'password123'
      })
      .expect(res => {
        sinon.assert.calledOnce(User.findOne);
        sinon.assert.calledOnce(User.create);
      })
      .expect(302, done);
  });
});

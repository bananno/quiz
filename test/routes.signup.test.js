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
  });

  afterEach(() => {
  });

  it('fails when username is blank', done => {
    request(app)
      .post('/signup')
      .send({
        username: '',
        password: 'password123'
      })
      .expect(res => {
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
        const errorMsg = JSON.parse(res.error.text).message;
        expect(errorMsg).to.equal('All fields are required.');
      })
      .expect(412, done);
  });
});

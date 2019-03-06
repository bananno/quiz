const expect = require('chai').expect;
const sinon = require('sinon');
const request = require('supertest');
const express = require('express');
const router = require('../routes/index');
const User = require('../models/user');

const app = express()
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

  it('is executed when unit has moves remaining', done => {
    done();
  });
});

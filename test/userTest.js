import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
require('dotenv').config();

import app from '../server';
import users from '../server/data/users'

const { user_secret } = process.env
const newUser = {
  email: 'person@example.com',
  first_name: 'person',
  last_name: 'person',
  password: 'qwertyuiop',
  phoneNumber: '0780000000',
  address: 'Telecom House'
}

// Test signing up using wrong data types
const wrongData = {
  email: 12345,
  first_name: 123,
  last_name: 'person',
  password: 'qwertyuiop',
  phoneNumber: '0780000000',
  address: 'Telecom House'
}

chai.use(chaiHttp)
const should = chai.should()

describe('Test Users endpoints', () => {

  describe('Test User sign up route', () => {
    it('It should add a new user to the app', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(201);
          done();
        });
    });
    it('It should return 400 when you try filling incorrect data', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(wrongData)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

});

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

chai.use(chaiHttp);
chai.should();

const newUser = {
  email: 'person@example.com',
  first_name: 'Test',
  last_name: 'user',
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

const correctCredentials = {
  email: 'person@example.com',
  password: 'qwertyuiop'
}
const wrongCredentials = {
  email: 'alain',
  password: 'mnbvcxz'
};

describe('Test Users endpoints', () => {

  describe('Test User sign up route', () => {
    it('It should add a new user to the app', (done) => {
      chai.request(app)
        .post('/api/v2/auth/signup')
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
        .post('/api/v2/auth/signup')
        .send(wrongData)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
  describe('Test User sign in route', () => {
    it('It should log in the user to the app', (done) => {
      chai.request(app)
        .post('/api/v2/auth/signin')
        .send(correctCredentials)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(200);
          done();
        });
    });
    it('It should return 400 when you try filling incorrect credentials', (done) => {
      chai.request(app)
        .post('/api/v2/auth/signin')
        .send(wrongCredentials)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
});

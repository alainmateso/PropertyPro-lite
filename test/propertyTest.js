import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import properties from '../server/data/properties'
import users from '../server/data/users'
import jwt from 'jsonwebtoken'
require('dotenv').config();

const { user_secret } = process.env;

const adminUser = users[0]
const normalUser = users[1]

const adminToken = jwt.sign({ ...adminUser }, user_secret, { expiresIn: '1h' });
adminUser.token = adminToken;
const normalToken = jwt.sign({ ...normalUser }, user_secret, { expiresIn: '1h' });
normalUser.token = normalToken

const newDetails = {
  price: 1000,
  state: 'Rda',
  city: 'Kgl',
  address: 'Ave 6',
  type: '2 bedroom'
}

// Test incorect data types while updating
const wrongData = {
  price: '1000',
  state: 232,
  address: 'Ave 6',
  type: '2 bedroom'
}

chai.use(chaiHttp)
const should = chai.should()
const expect = chai.expect;

describe('Test Properties endpoints', () => {

  describe('Test UPDATE property route', () => {

    it('It should return 401 when you try to update without loging in', (done) => {
      chai.request(app)
        .patch('/api/v1/property/1')
        .send(newDetails)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(401);
          res.body.should.have.property('message').eql('Sign in to have access');
        });
      done();
    });

    it('It should UPDATE a property', (done) => {
      chai.request(app)
        .patch('/api/v1/property/1')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newDetails)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(201);
          res.body.should.have.property('data').eql(properties[0]);
        });
      done();
    });

    it('It should return 403 when you try to update a property which is not yours', (done) => {
      chai.request(app)
        .patch('/api/v1/property/1')
        .set('Authorization', `Bearer ${normalToken}`)
        .send(newDetails)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(403);
        });
      done();
    });

    it('It should return 404 when you try to update a non existent property', (done) => {
      chai.request(app)
        .patch('/api/v1/property/10')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newDetails)
        .end((err, res) => {
          res.should.have.status(404);
        });
      done();
    });

    it('It should return 400 when you try to use wrong data types', (done) => {
      chai.request(app)
        .patch('/api/v1/property/1')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(wrongData)
        .end((err, res) => {
          res.should.have.status(400);
        });
      done();
    });
  });

  describe('Test GET properties route', () => {
    it('It should GET all properties', (done) => {
      chai.request(app)
        .get('/api/v1/properties')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('data').eql(properties);
        });
      done();
    });

    it('It should GET a specific property by ID', (done) => {
      chai.request(app)
        .get('/api/v1/property/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('data').eql(properties[0]);
        });
      done();
    });

    it('It should return 404 when you try GET a property that that does not exist', (done) => {
      chai.request(app)
        .get('/api/v1/property/4')
        .end((err, res) => {
          res.body.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(404);
          res.body.should.have.property('error').eql('No property found');
        });
      done();
    });
  });

  describe('Test Mark property as sold', () => {

    it('It should return 401 when you are not loged in', (done) => {
      chai.request(app)
        .patch('/api/v1/property/1/sold')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(401);
        });
      done();
    });
    it('It should mark a given property as sold', (done) => {
      chai.request(app)
        .patch('/api/v1/property/1/sold')
        .set('Authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(200);
        });
      done();
    });
    it('It should return 403 when you try to mark a property which is not yours', (done) => {
      chai.request(app)
        .patch('/api/v1/property/1/sold')
        .set('Authorization', `Bearer ${normalToken}`)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(403);
        });
      done();
    });
    it('It should return 404 when trying to mark a non existent property as sold', (done) => {
      chai.request(app)
        .patch('/api/v1/property/10/sold')
        .set('Authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(404);
        });
      done();
    });
  });

  describe('Test GET properties by type', () => {
    it('It should get properties of a specific type', (done) => {
      chai.request(app)
        .get('/api/v1/property?type=2 bedroom')
        .end((err, res) => {
          res.should.have.status(200);
        });
      done();
    });
    it('It should return 404 when you search for a non existent property type', (done) => {
      chai.request(app)
        .get('/api/v1/property?type=10 bedroom')
        .end((err, res) => {
          res.should.have.status(404);
        });
      done();
    });
  });

  describe('Test DELETE property route', () => {

    it('It should return 401 when you are not loged in', (done) => {
      chai.request(app)
        .delete('/api/v1/property/1')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(401);
          res.body.should.have.property('message').eql('Sign in to have access');
        });
      done();
    });
    it('It should return 403 when you try to delete a property which is not yours', (done) => {
      chai.request(app)
        .delete('/api/v1/property/1')
        .set('Authorization', `Bearer ${normalToken}`)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(403);
          res.body.should.have.property('message').eql('This is not your property');
        });
      done();
    });
    it('It should delete a property by id', (done) => {
      chai.request(app)
        .delete('/api/v1/property/1')
        .set('Authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('message').eql('Property deleted successfully');
        });
      done();
    });
    it('It should delete the second property by id', (done) => {
      chai.request(app)
        .delete('/api/v1/property/2')
        .set('Authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('message').eql('Property deleted successfully');
        });
      done();
    });
    it('It should return 404 when no properties were found', (done) => {
      chai.request(app)
        .get('/api/v1/properties')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(404);
          res.body.should.have.property('error').eql('No proerties found');
        });
      done();
    });

    it('It should return 404 when the id is incorrect', (done) => {
      chai.request(app)
        .delete('/api/v1/property/100')
        .set('Authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('status').eql(404);
          res.body.should.have.property('error').eql('No property found');
        });
      done();
    });
  });

});

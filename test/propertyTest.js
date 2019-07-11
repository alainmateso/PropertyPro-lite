import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../server';
import properties from '../server/data/properties'

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
    it('It should UPDATE a property', (done) => {
      chai.request(app)
        .patch('/api/v1/property/1')
        .send(newDetails)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(201);
          res.body.should.have.property('data').eql(properties[0]);
        });
      chai.request(app)
        .patch('/api/v1/property/10')
        .send(newDetails)
        .end((err, res) => {
          res.should.have.status(404);
        });
      chai.request(app)
        .patch('/api/v1/property/1')
        .send(wrongData)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
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
          done();
        });
    });
  });

  describe('Test GET specific property route', () => {
    it('It should GET a specific property by ID', (done) => {
      chai.request(app)
        .get('/api/v1/property/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('data').eql(properties[0]);
        });
      chai.request(app)
        .get('/api/v1/property/4')
        .end((err, res) => {
          res.body.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(404);
          res.body.should.have.property('error').eql('No property found');
          done();
        });
    });
  });

  describe('Test Mark property as sold', () => {
    it('It should mark a given property as sold', (done) => {
      chai.request(app)
        .patch('/api/v1/property/1/sold')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(200);
        });
      chai.request(app)
        .patch('/api/v1/property/10/sold')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(404);
          done();
        });
    });
  });

  describe('Test GET properties by type', () => {
    it('It should get properties of a specific type', (done) => {
      chai.request(app)
        .get('/api/v1/property?type=2 bedroom')
        .end((err, res) => {
          res.should.have.status(200);
        });
      chai.request(app)
        .get('/api/v1/property?type=10 bedroom')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe('Test delete property route', () => {
    it('It should delete a property by id', (done) => {
      chai.request(app)
        .delete('/api/v1/property/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('message').eql('Property deleted successfully');
        });
      chai.request(app)
        .delete('/api/v1/property/100')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('status').eql(404);
          res.body.should.have.property('error').eql('No property found');
          done();
        });
    });
  });
});

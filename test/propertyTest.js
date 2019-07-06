import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../server';
import properties from '../server/data/properties'
import { stat } from 'fs';

chai.use(chaiHttp)
const should = chai.should()

describe('Test Server', () => {
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
          done();
        });
      chai.request(app)
        .get('/api/v1/property/4')
        .end((err, res) => {
          res.body.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(404);
          res.body.should.have.property('error').eql('No property found');
        });
    });

    describe('Test POST property route', () => {
      it('It should POST a new property', (done) => {
        const newProperty = {
          owner: 1,
          status: 'available',
          price: 2000000,
          state: 'Rwanda',
          city: 'Kigali',
          address: 'KN 130 st',
          type: '2 bedroom',
          image: 'http://res.cloudinary.com/codeal/image/upload/v1562438357/e99ook5kfpkrrtxva64p.jpg'
        }
        chai.request(app)
          .post('/api/v1/property')
          .send(newProperty)
          .end((err, res) => {
            res.should.have.status(400)
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql(400);
            res.body.should.have.property('data').should.be.a('array');
            res.body.should.have.property('data').should.have.property('owner').eql(newProperty.owner)
            done();
          });
      });
    });

  });
});

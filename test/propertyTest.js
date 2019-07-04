import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../server';
import properties from '../server/data/properties'

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

});

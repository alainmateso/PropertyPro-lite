import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import queryExecutor from '../server/database/queryExecutor';
import queries from '../server/database/queries';

chai.use(chaiHttp);
chai.should();

const newDetails = {
  price: 134567,
  state: 'Kenya'
};

const Admin = {
  email: 'admin@demo.com',
  password: 'qwertyuiop',
};

const invalidToken = 'sasdsfasdfasdfewfwqewq';
let adminToken;

describe('Test Properties endpoints', () => {

  before((done) => {
    chai.request(app)
      .post('/api/v2/auth/signin')
      .send(Admin)
      .end((err, res) => {
        adminToken = res.body.token;
        done();
      });
  });

  describe('Test UPDATE property route', () => {

    it('It should return 404 when you try to hit an non existent route', (done) => {
      chai.request(app)
        .get('/api/v2/amen')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('Incorrect route')
          done();
        });
    });

    it('It should return 401 when you try to update without loging in', (done) => {
      chai.request(app)
        .patch('/api/v2/property/1')
        .send(newDetails)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(401);
          res.body.should.have.property('message').eql('Sign in to have access');
          done();
        });
    });

    it('It should return 400 when you try to log in with an invalid token', (done) => {
      chai.request(app)
        .patch('/api/v2/property/1')
        .set('Authorization', `Bearer ${invalidToken}`)
        .send(newDetails)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error').eql('Invalid token');
          done();
        });
    });

  });

  describe('Test GET properties route', () => {
    it('It should GET all properties', (done) => {
      chai.request(app)
        .get('/api/v2/properties')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(200);
          done();
        });
    });

    it('It should GET a specific property by ID', (done) => {
      chai.request(app)
        .get('/api/v2/property/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(200);
          done();
        });
    });

    it('It should return 404 when you try GET a property that that does not exist', (done) => {
      chai.request(app)
        .get('/api/v2/property/4')
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

    it('It should return 401 when you are not loged in', (done) => {
      chai.request(app)
        .patch('/api/v2/property/1/sold')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(401);
          done();
        });
    });

    it('It should return 400 when you try to log in with an invalid token', (done) => {
      chai.request(app)
        .patch('/api/v2/property/1')
        .set('Authorization', `Bearer ${invalidToken}`)
        .send(newDetails)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error').eql('Invalid token');
          done();
        });
    });

    it('It should return 404 when trying to mark a non existent property as sold', (done) => {
      chai.request(app)
        .patch('/api/v2/property/10/sold')
        .set('Authorization', `Bearer ${adminToken}`)
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
        .get('/api/v2/property?type=3 bedroom')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('It should return 404 when you search for a non existent property type', (done) => {
      chai.request(app)
        .get('/api/v2/property?type=10 bedroom')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe('Test DELETE property route', () => {

    it('It should return 401 when you are not loged in', (done) => {
      chai.request(app)
        .delete('/api/v2/property/1')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(401);
          res.body.should.have.property('message').eql('Sign in to have access');
          done();
        });
    });

    it('It should return 400 when you try to log in with an invalid token', (done) => {
      chai.request(app)
        .patch('/api/v2/property/1')
        .set('Authorization', `Bearer ${invalidToken}`)
        .send(newDetails)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error').eql('Invalid token');
          done();
        });
    });

    it('It should delete a property by id', (done) => {
      chai.request(app)
        .delete('/api/v2/property/1')
        .set('Authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('message').eql('Property deleted successfully');
          done();
        });
    });

    it('It should return 404 when no properties were found', (done) => {
      chai.request(app)
        .get('/api/v2/properties')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(404);
          res.body.should.have.property('message').eql('No properties were found');
          done();
        });
    });

    it('It should return 404 when the id is incorrect', (done) => {
      chai.request(app)
        .delete('/api/v2/property/100')
        .set('Authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('status').eql(404);
          res.body.should.have.property('error').eql('No property found');
          done();
        });
    });
  });

});

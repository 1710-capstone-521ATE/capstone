const {expect} = require('chai');
const request = require('supertest');
const app = require('../app');
const PORT = 5218;
const server = app.listen(PORT, () => {
  console.log(`Eating away on PORT ${PORT}`);
});

const {db, User} = require('../db/models');

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  });

  describe('/api/users/', () => {
    const sarah = {
      email: 'sarah@sarah.com',
      password: '123',
      firstName: 'Sarah',
      lastName: 'Zhao'
    };

    beforeEach(() => {
      return User.create(sarah)
    })

    it('GET /api/users', () => {
      return request(server)
      .get('/api/users')
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an('array')
        expect(res.body[0].email).to.be.equal(sarah.email)
        expect(res.body[0].password).to.be.equal(undefined)
      })
    })

    it('POST /api/users', () => {
      const sandy = {
        email: 'sandy@smak.com',
        password: '123',
        firstName: 'Sandy',
        lastName: 'Mak'
      }
      return request(server)
      .post('/api/users')
      .send(sandy)
      .expect(200)
      .then(res => {
        expect(res.body.password).to.be.equal(undefined)
        expect(res.body.salt).to.be.equal(undefined)
        expect(res.body.fullName).to.be.equal('Sandy Mak')
      })
    })

    it('GET BY ID /api/users/:id', () => {
      return request(server)
      .get('/api/users/1')
      .expect(200)
      .then(res => {
        expect(res.body.fullName).to.be.equal('Sarah Zhao')
      })
    })

    it('PUT BY ID /api/users/:id', () => {
      return request(server)
      .put('/api/users/1')
      .send({email: 'harry@potter.com'})
      .expect(200)
      .then(res => {
        expect(res.body.email).to.be.equal('harry@potter.com')
        expect(res.body.fullName).to.be.equal('Sarah Zhao')
      })
    })

    it('DELETES BY ID /api/users/:id', () => {
      return request(server)
      .delete('/api/users/1')
      .expect(204)
    })

    it('GET all current events', () => {
      return request(server)
      .get('/api/users/1/groups/events')
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an('array')
      })
    })
  })
})

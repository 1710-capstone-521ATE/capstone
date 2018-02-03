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
      })
    })
  })
})

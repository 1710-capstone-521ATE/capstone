const {expect} = require('chai');
const {db, User} = require('./index');

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  describe('instance methods', () => {
    describe('correct Password', () => {
      let sarah;

      beforeEach(() => {
        return User.create({
          email: 'sarah@sarah.com',
          password: '123',
          firstName: 'Sarah',
          lastName: 'Zhao'
        })
        .then(user => {
          sarah = user;
        })
      });

      it('returns true if the password is correct', () => {
        expect(sarah.correctPassword('123')).to.be.equal(true);
      })

      it('returns false if the password is incorrect', () => {
        expect(sarah.correctPassword('hilarious')).to.be.equal(false);
      })
    })
  })
})

const Sequelize = require('sequelize');
const db = require('../db');
const crypto = require('crypto');

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
      notEmpty: true
    },
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING
  },
  salt: {
    type: Sequelize.STRING
  },
  googleId: {
    type: Sequelize.STRING
  },
  firstName: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    },
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    },
    allowNull: false
  },
  imageURL: {
    type: Sequelize.STRING,
    defaultValue: 'https://i.pinimg.com/736x/9f/c4/64/9fc464ce226213fde29cb9ab16981118--teeth-corgis.jpg'
  },
  dob: {
    type: Sequelize.DATEONLY,
  },
  zipcode: {
    type: Sequelize.STRING(5),
    validate: {
      isNumeric: true
    }
  },
  fullName: {
    type: Sequelize.VIRTUAL,
    get () {
      return this.getDataValue('firstName') + ' ' + this.getDataValue('lastName');
    }
  }
})

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt) === this.password
}

const excludedFields = ['password', 'salt', 'googleId', 'createdAt', 'updatedAt', 'zipcode'];
User.prototype.sanitize = function() {
  const obj = {};
  for (const k of Object.keys(this.toJSON())) {
    if (excludedFields.includes(k)) continue;
    obj[k] = this[k];
  }
  return obj;
}

/**
 * classMethods
 */
User.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function (plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password, user.salt)
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)

module.exports = User;

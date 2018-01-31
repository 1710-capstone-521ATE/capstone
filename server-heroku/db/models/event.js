const Sequelize = require('sequelize');
const db = require('../db');
const crypto = require('crypto');

const Event = db.define('event', {
  restaurantId: Sequelize.STRING,
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 5
    },
    defaultValue: 3
  },
  code: {
    type: Sequelize.STRING,
    unique: true
  }
})

const setCode = (event) => {
    event.code = crypto.randomBytes(3).toString('hex');
}

Event.beforeCreate(setCode);

module.exports = Event;

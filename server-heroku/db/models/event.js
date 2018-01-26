const Sequelize = require('sequelize');
const db = require('../db');

const Event = db.define('event', {
  restaurantId: Sequelize.STRING,
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 5
    },
    defaultValue: 3
  }
})

module.exports = Event;

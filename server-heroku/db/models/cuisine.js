const Sequelize = require('sequelize');
const db = require('../db');

const Cuisine = db.define('cuisine', {
  name: Sequelize.STRING
});

module.exports = Cuisine;

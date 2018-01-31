const Sequelize = require('sequelize');
const db = require('../db');

const Cuisine = db.define('cuisine', {
  displayName: Sequelize.STRING,
  referenceName: Sequelize.STRING
});

module.exports = Cuisine;

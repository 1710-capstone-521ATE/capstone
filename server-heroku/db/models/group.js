const Sequelize = require('sequelize');
const db = require('../db');

const Group = db.define('group', {
  name: Sequelize.STRING
})

module.exports = Group;

const db = require('../db');

const User = require('./user');
const Group = require('./group');
const Event = require('./event');

User.belongsToMany(Group, { through: 'groupMembers' });
Group.belongsToMany(User, { through: 'groupMembers' });

Group.hasMany(Event);
Event.belongsTo(Group);

User.hasMany(Event, { as: 'host' });
Event.belongsTo(User);

module.exports = {
  Group,
  Event,
  User,
  db
};

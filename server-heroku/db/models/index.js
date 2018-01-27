const db = require('../db');

const User = require('./user');
const Group = require('./group');
const Event = require('./event');
const Cuisine = require('./cuisine');

User.belongsToMany(Group, { through: 'groupMembers' });
Group.belongsToMany(User, { through: 'groupMembers' });

Group.hasMany(Event);
Event.belongsTo(Group);

Event.belongsTo(User, { foreignKey: 'hostId' });
User.hasMany(Event, {foreignKey: 'hostId'});

User.belongsToMany(Cuisine, {through: 'preferences'});
Cuisine.belongsToMany(User, {through: 'preferences'});

module.exports = {
  Group,
  Event,
  User,
  Cuisine,
  db
};


// db.sync();

// async function alpha() {
//   let user = await User.create({email: 'sarahzhao25@gmail.com', firstName: 'Sarah', lastName: 'Zhao'});
//   let event = await Event.create({});
//   event.setUser(user);
// }

// alpha();

const axios = require('axios');
const { SERVER } = process.env.PORT || require('../secrets.js');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made! with ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the eatery!`)
    })

    socket.on('joinRoom', async ({groupId, eventCode, userId, isAttending, latitude, longitude}) => {
      let body = await axios.put(`${SERVER}/api/groups/${groupId}/events/${eventCode}`, { userId: userId, isAttending, latitude, longitude });
      let {users, midpoint, event} = body.data;

      if (users.length) {
        socket.join(`${eventCode}`); //join the event with that event ID as its name
        io.to(`${eventCode}`).emit('currentStatus', {users, midpoint, groupId, event, eventCode}); //send back the array
      }

    })

    socket.on('overrideWaitingRoom', async ({users, event}) => {
      let body = await Promise.all(users.map(user => axios.put(`${SERVER}/api/groups/${event.groupId}/events/${event.eventCode}`, { userId: user.id, isAttending: false, latitude: null, longitude: null })))

      let result = body.find(latest => latest.data.midpoint.latitude !== null);

      io.to(`${event.eventCode}`).emit('currentStatus', {users: result.data.users, midpoint: result.data.midpoint, groupId: event.groupId, event: result.data.event, eventCode: event.eventCode});
    })

    socket.on('vote', (restaurantName, eventCode) => {
      io.to(`${eventCode}`).emit('ballot', restaurantName)
    })
  });
};

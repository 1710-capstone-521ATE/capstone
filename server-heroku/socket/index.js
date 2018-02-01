const axios = require('axios');
const { SERVER } = require('../secrets.js');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made! with ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the eatery!`)
    })

    socket.on('joinRoom', async ({groupId, eventId, hostId, latitude, longitude}) => {
      let body = await axios.put(`${SERVER}/api/groups/${groupId}/events/${eventId}`, { userId: hostId, latitude, longitude });
      let {users, midpoint} = body.data;
      if (users.length) {
        socket.join(`${eventId}`); //join the event with that event ID as its name
        io.to(`${eventId}`).emit('currentStatus', {users, midpoint}); //send back the array
      }

    })

  });
};

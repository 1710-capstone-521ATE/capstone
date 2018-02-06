const axios = require('axios');
const { SERVER } = require('../secrets.js');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made! with ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the eatery!`)
    })

    socket.on('joinRoom', async ({groupId, eventCode, userId, latitude, longitude}) => {
      let body = await axios.put(`${SERVER}/api/groups/${groupId}/events/${eventCode}`, { userId: userId, latitude, longitude });
      let {users, midpoint} = body.data;

      if (users.length) {
        socket.join(`${eventCode}`); //join the event with that event ID as its name
        io.to(`${eventCode}`).emit('currentStatus', {users, midpoint, eventCode}); //send back the array
      }

    })
    socket.on('declineInvite', async ({userId, groupId, eventCode}) => {


    })

    socket.on('vote', (restaurantName, eventCode) => {
      io.to(`${eventCode}`).emit('ballot', restaurantName)
    })
  });
};

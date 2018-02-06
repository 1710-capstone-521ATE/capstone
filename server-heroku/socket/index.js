const axios = require('axios');
const { SERVER } = require('../secrets.js');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made! with ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the eatery!`)
    })

    socket.on('joinRoom', async ({groupId, eventCode, userId, isAttending, latitude, longitude}) => {
      console.log({groupId, eventCode, userId, isAttending, latitude, longitude});
      let body = await axios.put(`${SERVER}/api/groups/${groupId}/events/${eventCode}`, { userId: userId, isAttending, latitude, longitude });
      let {users, midpoint, event} = body.data;

      if (users.length) {
        socket.join(`${eventCode}`); //join the event with that event ID as its name
        io.to(`${eventCode}`).emit('currentStatus', {users, midpoint, groupId, event, eventCode}); //send back the array
      }

    })
    // socket.on('declineInvite', async ({userId, groupId, eventCode}) => {
    //   let body = await axios.put(`${SERVER}/api/groups/${groupId}/users/${userId}`);
    //   let {users, midpoint, event} = body.data;

    //   if (users.length) {
    //     socket.join(`${eventCode}`); //join the event with that event ID as its name
    //     io.to(`${eventCode}`).emit('currentStatus', {users, midpoint, groupId, event, eventCode}); //send back the array
    //   }
    // })

    socket.on('vote', (restaurantName, eventCode) => {
      io.to(`${eventCode}`).emit('ballot', restaurantName)
    })
  });
};

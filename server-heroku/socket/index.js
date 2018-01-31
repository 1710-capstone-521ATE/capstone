const axios = require('axios');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made! with ${socket.id}`)

    socket.on('createRoom',
      (data) => console.log(data)
    )

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the eatery!`)
    })

  });
};

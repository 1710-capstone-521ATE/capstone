import io from 'socket.io-client';
const SERVER = 'http://172.16.22.226:5218';

const socket = io(SERVER)

socket.on('connect', () => {
  console.log('Connected!')
})

export default socket;

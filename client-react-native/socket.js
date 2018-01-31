import io from 'socket.io-client';
const SERVER = 'http://172.16.23.224:5218';

const socket = io(SERVER)

socket.on('connect', () => {
  console.log('Connected!')
})

export default socket;

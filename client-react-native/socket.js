import io from 'socket.io-client';
import {SERVER} from './serverInfo';

const socket = io(SERVER)

socket.on('connect', () => {
  console.log('Connected!')
})

export default socket;

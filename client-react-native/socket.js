import io from 'socket.io-client';
import {SERVER} from './serverInfo';
import store, { getUsers} from './store';

const socket = io(SERVER)

socket.on('connect', () => {
  console.log('Connected!')
})

//If there is a midpoint sent from the backend, then we need to alert ALL the users involved in the event that they can move on to the next view.
socket.on('currentStatus', (currentGroupStatusArr) => {
  let midpoint = currentGroupStatusArr.filter(points => points.id === 'midpoint')[0];
  if (midpoint) {
    store.dispatch(getUsers(currentGroupStatusArr))
   // store.dispatch ...=> send to the next view. The above is currently a placeholder.
  }
  else {
    store.dispatch(getUsers(currentGroupStatusArr));
  }
})

export default socket;

import io from 'socket.io-client';
import {SERVER} from './serverInfo';
import store, { getUsers, fetchRestaurants} from './store';

const socket = io(SERVER)

socket.on('connect', () => {
  console.log('Connected!')
})

//If there is a midpoint sent from the backend, then we need to alert ALL the users involved in the event that they can move on to the next view.
socket.on('currentStatus', ({users, midpoint}) => {
  if (midpoint.latitude) {
    store.dispatch(fetchRestaurants(midpoint));
    store.dispatch(getUsers(users));
   // store.dispatch ...=> send to the next view. The above is currently a placeholder.
  }
  else {
    store.dispatch(getUsers(users));
  }
})

export default socket;

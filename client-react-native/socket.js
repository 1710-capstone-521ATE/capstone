import io from 'socket.io-client';
import {SERVER} from './serverInfo';
import store, { getUsers, fetchRestaurants, updateBallot, addEventCode } from './store';

const socket = io(SERVER)

socket.on('connect', () => {
  console.log('Connected!')
})

//If there is a midpoint sent from the backend, then we need to alert ALL the users involved in the event that they can move on to the next view.
socket.on('currentStatus', ({users, midpoint, eventCode}) => {
  if (midpoint.latitude) {
    store.dispatch(fetchRestaurants(midpoint));
  }
    store.dispatch(getUsers(users));
    store.dispatch(addEventCode(eventCode));
})

socket.on('ballot', restaurantName => {
  store.dispatch(updateBallot(restaurantName));
})

export default socket;

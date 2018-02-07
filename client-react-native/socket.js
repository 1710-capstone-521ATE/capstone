import io from 'socket.io-client';
import {SERVER} from './serverInfo';
import store, { getUsers, fetchRestaurants, updateBallot, getEvent, overrideEvent } from './store';

const socket = io(SERVER)

socket.on('connect', () => {
  console.log('Connected!')
})

//If there is a midpoint sent from the backend, then we need to alert ALL the users involved in the event that they can move on to the next view.
socket.on('currentStatus', ({users, midpoint, eventCode, event, groupId}) => {
  if (midpoint.latitude) {
    store.dispatch(fetchRestaurants(midpoint));
  }
    store.dispatch(getUsers(users));
  store.dispatch(getEvent({ eventCode: event.code, groupId: groupId, name: event.name, hostId: event.hostId }));
})

socket.on('ballot', restaurantName => {
  store.dispatch(updateBallot(restaurantName));
})

socket.on('overridden', (event) => {
  event.override = true;
  store.dispatch(getEvent(event));
})

export default socket;

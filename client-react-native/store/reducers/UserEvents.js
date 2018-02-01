import axios from 'axios';
import { SERVER } from '../../serverInfo';

const GET_USER_EVENTS = 'GET_USER_EVENTS';

export const getUserEvents = (events) => {
  return {
    type: GET_USER_EVENTS,
    events
  }
}

export function fetchUserEvents(id) {
    return (dispatch) => {
      return axios.get(`${SERVER}/api/users/${id}/groups/events`)
      .then(events => dispatch(getUserEvents(events.data)))
      .catch(console.error);
    }
  }

export default (state = [], action) => {
  switch (action.type) {
    case GET_USER_EVENTS:
      return action.events;
    default:
      return state;
  }
}

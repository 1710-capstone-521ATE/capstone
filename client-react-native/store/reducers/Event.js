const GET_EVENT = 'GET_EVENT';
const SET_EVENT = 'SET_EVENT';

export const getEvent = (event) => {
  return {
    type: GET_EVENT,
    event
  }
}

export const addEventCode = (eventCode) => {
  return {
    type: SET_EVENT,
    event: eventCode
  }
}

export default (state = '', action) => {
  switch (action.type) {
    case GET_EVENT:
      return action.event;
    case SET_EVENT:
      return action.event;
    default:
      return state;
  }
}

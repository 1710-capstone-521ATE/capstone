const GET_EVENT = 'GET_EVENT';

export const getEvent = (event) => {
  return {
    type: GET_EVENT,
    event
  }
}

export default (state = {}, action) => {
  switch (action.type) {
    case GET_EVENT:
      return action.event;
    default:
      return state;
  }
}

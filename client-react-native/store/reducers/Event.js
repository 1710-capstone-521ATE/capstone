import {RootNavigator} from '../../App.js';

const GET_EVENT = 'GET_EVENT';

export const getEvent = (event) => {
  return {
    type: GET_EVENT,
    event
  }
}

export const overrideEvent = (event) => {
  return (dispatch) => {
    //ideally would like to pass 'navigation', and force the navigate to another view, but the current method is more UI intuitive. This is why this looks very similarly to `getEvent`.
    dispatch(getEvent(event));
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

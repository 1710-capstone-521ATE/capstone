const UPDATE_BALLOT = 'UPDATE_BALLOT';

export const updateBallot = (restaurantName) => {
  return {
    type: UPDATE_BALLOT,
    restaurantName
  }
}

export default (state = {}, action) => {
  switch (action.type) {
    case UPDATE_BALLOT:
      if (state[action.restaurantName]) {
        return Object.assign({}, state, {[action.restaurantName]: state[action.restaurantName] + 1})
      } else {
        return Object.assign({}, state, {[action.restaurantName]: 1})
      }
    default:
      return state;
  }
}

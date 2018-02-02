import { getRestaurants } from './Restaurants';

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
        state[action.restaurantName]++
      } else {
        state[action.restaurantName] = 1;
      }
      return state;
    default:
      return state;
  }
}

import { fetchYelpRestaurants, createMidpointUrl } from '../../Utils/restaurantAPI';

const GET_RESTAURANTS = 'GET_RESTAURANTS';

const getRestaurants = (restaurants) => {
  return {
    type: GET_RESTAURANTS,
    restaurants
  }
}

export const fetchRestaurants = (midpoint) => {
  return (dispatch) => {
    let url = createMidpointUrl(midpoint);
    return fetchYelpRestaurants(url)
    .then(restaurants => dispatch(getRestaurants(restaurants)))
    .catch(console.error);
  }
}

export default (state = [], action) => {
  switch (action.type) {
    case GET_RESTAURANTS:
      return action.restaurants;
    default:
      return state;
  }
}

[{r1}, r2, r4]
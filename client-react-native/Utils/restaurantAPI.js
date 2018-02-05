import axios from 'axios';
import { yelpKey } from '../serverInfo.js';

export const createMidpointUrl = (midpoint) => (`https://api.yelp.com/v3/businesses/search?latitude=${midpoint.latitude}&longitude=${midpoint.longitude}&categories=restaurants`);

export const fetchYelpRestaurants = (url) => axios(
  {
    method: 'GET',
    url: url,
    headers: {
      Authorization:
      `BEARER ${yelpKey}`
    }
  }
)
.then((restaurants) => {return restaurants.data.businesses.slice(0, 5)})
.catch(console.error);

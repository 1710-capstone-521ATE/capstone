import axios from 'axios';
import { SERVER } from '../../serverInfo';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user});
const removeUser = () => ({type: REMOVE_USER});
/**
 * THUNK CREATORS
 */
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res =>
        dispatch(getUser(res.data || defaultUser)))
      .catch(err => console.log(err))

export const auth = (user, navigation, method) =>
  dispatch =>
    axios.post(`${SERVER}/auth/${method}`, user)
      .then(res => {
        dispatch(getUser(res.data));
        navigation.navigate('EventView');
      }, authError => { // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({error: authError.response.data}))
      })
      .catch(err => console.error(err))

export const logout = () =>
  dispatch =>
    axios.post(`${SERVER}/auth/logout`)
      .then(_ => dispatch(removeUser()))
      .catch(err => console.log(err))

//nope not this one. In progress, but not actually working.
export const googleLogin = (user, navigation) => {
  return dispatch => {
      dispatch(getUser(user));
      navigation.navigate('EventView');
    }
  }

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return {};
    default:
      return state;
  }
}

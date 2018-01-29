import axios from 'axios';
const SERVER = 'http://172.16.25.137:5218'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
const ADD_USER = 'ADD_USER';

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user});
const removeUser = () => ({type: REMOVE_USER});
const addUser = user => ({type: ADD_USER})
/**
 * THUNK CREATORS
 */
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res =>
        dispatch(getUser(res.data || defaultUser)))
      .catch(err => console.log(err))

export const auth = (email, password, method) =>
  dispatch =>
    axios.post(`${SERVER}/auth/${method}`, { email, password })
      .then(res => {
        dispatch(getUser(res.data))
      }, authError => { // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({error: authError}))
      })
      .catch(err => console.error(err))

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser())
      })
      .catch(err => console.log(err))

export const addNewUser = (user) => {
    return  dispatch =>
    axios.post(`${SERVER}/api/users`, user)
      .then(res => getUser(res.data))
      .catch(err => console.error(err))     
}



/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case ADD_USER: 
      return action.user;
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
}

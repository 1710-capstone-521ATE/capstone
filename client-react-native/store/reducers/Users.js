import axios from 'axios';
import { SERVER } from '../../serverInfo';
import { getEvent } from '../store';

const GET_USERS = 'GET_USERS';

const getUsers = function(users) {
  return {
    type: GET_USERS,
    users
  }
}

export function fetchUsers() {
  return (dispatch) => {
    return axios.get(`${SERVER}/api/users`)
    .then(users => dispatch(getUsers(users.data)))
    .catch(console.error);
  }
}

export function createAndFetchGroup(userIds, hostId) {
  let invitedUsers;
  return (dispatch) => {
    return axios.post(`${SERVER}/api/groups`, {userIds: userIds.concat(hostId)})
    .then(group => {
      invitedUsers = group.data.users;
      return axios.post(`${SERVER}/api/groups/${group.data.id}/events`, {hostId});
    })
    .then(event => {
      dispatch(getUsers(invitedUsers)); //updates the users array with invite list
      dispatch(getEvent(event.code)); //updates the event reducer with event hash code
    })
    .catch(console.error);
  }
}

export default function(users = [], action) {
  switch (action.type) {
    case GET_USERS:
      return action.users;
    default:
      return users;
  }
}

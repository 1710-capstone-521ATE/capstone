import axios from 'axios';
import { SERVER } from '../../serverInfo';
import { getEvent } from '../index';

const GET_USERS = 'GET_USERS';

export const getUsers = function(users) {
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

export function createAndFetchGroup(userIds, hostId, eventName) {
  let invitedUsers, newGroupId;
  return (dispatch) => {
    return axios.post(`${SERVER}/api/groups`, {userIds: userIds.concat(hostId)})
    .then(group => {
      invitedUsers = group.data.users;
      newGroupId = group.data.id;
      return axios.post(`${SERVER}/api/groups/${group.data.id}/events`, {hostId, name: eventName});
    })
    .then(event => {
      dispatch(getUsers(invitedUsers)); //updates the users array with invite list
      dispatch(getEvent({eventCode: event.data.code, groupId: newGroupId, name: event.data.name})); //updates the event reducer with event hash code
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

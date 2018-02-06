let coords = [
  {
    latitude: 40.952411,
    longitude: -74.104963
  },
  {
    latitude: 40.764760,
    longitude: -73.920687
  },
  {
    latitude: 40.605848,
    longitude: -73.987360
  },
  {
    latitude: 40.598308,
    longitude: -73.976598
  },
]


function getMidpoint (arrayOfCoords) {
  let midpoint = {
    latitude: 0,
    longitude: 0
  }

  for (let i = 0; i < arrayOfCoords.length; i++) {
    let individualLatitude = Number(arrayOfCoords[i].latitude);
    let individualLongitude = Number(arrayOfCoords[i].longitude);

    midpoint.latitude += individualLatitude;
    midpoint.longitude += individualLongitude;
  }

  midpoint.latitude = (midpoint.latitude / arrayOfCoords.length).toString();
  midpoint.longitude = (midpoint.longitude / arrayOfCoords.length).toString();
  return midpoint
}

function addMidPointToCTX(usersArr) {
  const coordArr = usersArr.map(user => {
    let userCoords = {
      latitude: user.coords.latitude,
      longitude: user.coords.longitude
    }
    return userCoords;
  });
  return getMidpoint(coordArr);
}

async function fetchGroupUsers(group) {
  let users = await group.getUsers();
  let filteredUsers = await users.filter(user => {
    return user.groupMembers.isAttending === true
  }).map(user => {
    let userObj =
    {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: user.fullName,
      coords: {
        latitude: user.groupMembers.latitude,
        longitude: user.groupMembers.longitude
      }
    }
    return userObj;
  });
  return filteredUsers;
}

module.exports = {
  getMidpoint,
  addMidPointToCTX,
  fetchGroupUsers
};

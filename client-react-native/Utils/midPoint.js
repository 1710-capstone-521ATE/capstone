function movingMidpoint(usersArr) {
  const coordArr = usersArr.map(user => {
    let userCoords = {
      latitude: user.coords.latitude,
      longitude: user.coords.longitude
    }
    return userCoords;
  });
  return getMidpoint(coordArr);
}

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

export default movingMidpoint;

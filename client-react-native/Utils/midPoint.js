function movingMidpoint(usersArr) {
  if (usersArr[0].coords) { //the first time the store returns users - the data structure is different. there are NO coordinates at all.
    const coordArr = usersArr.map(user => {
      let userCoords = {
        latitude: user.coords.latitude,
        longitude: user.coords.longitude
      }
      return userCoords;
    });
    return getMidpoint(coordArr);
  }
  else {
    return {
      latitude: 40.7051,
      longitude: -74.0092
    }
  }
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

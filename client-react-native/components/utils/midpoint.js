export default function getMidpoint (arrayOfCoords) {
  let midpoint = {
    latitude: 0,
    longitude: 0
  }

  for (let i = 0; i < arrayOfCoords.length; i++) {
    let individualLatitude = arrayOfCoords[i].latitude;
    let individualLongitude = arrayOfCoords[i].longitude;

    midpoint.latitude += individualLatitude;
    midpoint.longitude += individualLongitude;
  }

  midpoint.latitude = midpoint.latitude / arrayOfCoords.length;
  midpoint.longitude = midpoint.longitude / arrayOfCoords.length;

  console.log(midpoint)

  return midpoint
}


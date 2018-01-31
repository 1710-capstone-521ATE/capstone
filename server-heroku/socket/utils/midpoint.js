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

//getMidpoint(coords)

module.exports = getMidpoint;

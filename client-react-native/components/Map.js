import React, { Component } from 'react';
import Expo, {Location, Permissions, Platform, MapView } from 'expo';
import { StyleSheet, Dimensions, View, Text } from 'react-native';


const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

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
  {
    latitude: 40.598308,
    longitude: -73.986598
  },

]


function getMidpoint (arrayOfCoords) {
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

  return midpoint
}

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Map extends Component {
  constructor() {
    super();
    this.state = {
    regionCenter:
        {
          latitude: 40.7051,
          longitude: -74.0092,
        }
    }
  }

  componentDidMount() {
    let midpoint = getMidpoint(coords);
    this.setState({regionCenter: midpoint})

  };

  render() {
    const {regionCenter} = this.state
      return (
        <MapView
          style={ styles.container }
          region={{
            latitude: regionCenter.latitude,
            longitude: regionCenter.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }}
        >
        {coords.map((coord, i) =>
          (<MapView.Marker
              key={i}
              coordinate={coord}
          />)
        )}
        <MapView.Marker
          coordinate={regionCenter}
       />
       </MapView>
      );
    }
}


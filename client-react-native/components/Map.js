import React, { Component } from 'react';
import { MapView } from 'expo';
import { StyleSheet, Dimensions } from 'react-native';
import midpointAlgo from './utils/midpoint'

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  }
});

let coords = [
  {
    latitude: 40.952411,
    longitude: -74.104963,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  },
  {
    latitude: 40.764760,
    longitude: -73.920687,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  },
  {
    latitude: 40.605848,
    longitude: -73.987360,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  },
  {
    latitude: 40.598308,
    longitude: -73.976598,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  },
]


// let { width, height } = Dimensions.get('window');
// const ASPECT_RATIO = width / height;
// const LATITUDE = 40.705043;
// const LONGITUDE = -74.009032;
// const LATITUDE_DELTA = 0.0922;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Map extends Component {
  constructor() {
    super();
    this.state = {
      region:
      [
        {
          latitude: 40.952411,
          longitude: -74.104963,
          // latitudeDelta: LATITUDE_DELTA,
          // longitudeDelta: LONGITUDE_DELTA,
        },
        {
          latitude: 40.764760,
          longitude: -73.920687,
          // latitudeDelta: LATITUDE_DELTA,
          // longitudeDelta: LONGITUDE_DELTA,
        },
        {
          latitude: 40.605848,
          longitude: -73.987360,
          // latitudeDelta: LATITUDE_DELTA,
          // longitudeDelta: LONGITUDE_DELTA,
        },
        {
          latitude: 40.598308,
          longitude: -73.976598,
          // latitudeDelta: LATITUDE_DELTA,
          // longitudeDelta: LONGITUDE_DELTA,
        },
      ]

      // {
      //   latitude: LATITUDE,
      //   longitude: LONGITUDE,
      //   latitudeDelta: LATITUDE_DELTA,
      //   longitudeDelta: LONGITUDE_DELTA,
      // }
    }
  }

  render() {
    let midpoint = midpointAlgo(this.state.region);
    return (
      <MapView
        style={ styles.container }
        initialRegion={
          midpoint
        }
      >
      {this.state.region.map(coord =>
        (<MapView.Marker
        key={coord.latitude}
        coordinate={coord}
        />)
    )}
      </MapView>
    );
  }
}


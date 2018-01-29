import React, { Component } from 'react';
import { MapView } from 'expo';
import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  }
});

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 40.705043;
const LONGITUDE = -74.009032;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Map extends Component {
  constructor() {
    super();
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
    }
  }

  render() {
    return (
      <MapView
        style={ styles.container }
        initialRegion={
          this.state.region
        }
      >
      <MapView.Marker
        coordinate={this.state.region}
      />
      </MapView>
    );
  }
}


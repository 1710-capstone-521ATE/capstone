
import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { Constants, MapView, Location, Permissions } from 'expo';

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class App extends Component {
  state = {
      location: {coords: { latitude: 40.952411, longitude: -74.104963}},
    };

    componentDidMount() {
      this._getLocationAsync();
    }

    _getLocationAsync = async () => {
     let { status } = await Permissions.askAsync(Permissions.LOCATION);

     if (status !== 'granted') {
       this.setState({
         locationResult: 'Permission to access location was denied',
       });
     }

     let location = await Location.getCurrentPositionAsync({});
     this.setState({ location: {coords: {latitude: location.coords.latitude, longitude: location.coords.longitude}} });
   }

  render() {

      return (
          <MapView
            style={styles.container}
            region={{ latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA }}
          >
            <MapView.Marker
              coordinate={this.state.location.coords}
              title="My Marker"
              description="Some description"

            />
          </MapView>
      )
    }
  }

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    // flex: 1,
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
    // backgroundColor: '#ecf0f1',
  },
  // paragraph: {
  //   margin: 24,
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  //   color: '#34495e',
  // },
});
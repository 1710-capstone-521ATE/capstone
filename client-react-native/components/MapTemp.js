
import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { Constants, MapView, Location, Permissions } from 'expo';

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class App extends Component {
  state = {
      mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA },
      locationResult: null,
      location: {coords: { latitude: 37.78825, longitude: -122.4324}},
    };

    componentDidMount() {
      this._getLocationAsync();
    }

    _handleMapRegionChange = mapRegion => {
      this.setState({ mapRegion });
    };

    _getLocationAsync = async () => {
     let { status } = await Permissions.askAsync(Permissions.LOCATION);

     if (status !== 'granted') {
       this.setState({
         locationResult: 'Permission to access location was denied',
         location,
       });
     }

     let location = await Location.getCurrentPositionAsync({});
     this.setState({ locationResult: JSON.stringify(location), location, });
   };
  // }

  render() {


    return (
        <MapView
          style={styles.container}
          region={{ latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA }}
          onRegionChange={this._handleMapRegionChange}
          showsMyLocationButton={false}
        >
          <MapView.Marker
            coordinate={this.state.location.coords}
            title="My Marker"
            description="Some description"

          />
        </MapView>

    );
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
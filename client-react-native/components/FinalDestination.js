import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, TextInput, Image, TouchableHighlight, Dimensions} from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1
  },
  yelp: {
    flex: 1
  },
  image: {
    height: 150,
    width: 150
  }
});

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0092;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default (props) => {
  const restaurant = props.restaurant;

  return (
    <View>
      <MapView
        style={styles.container}
        region={{
          latitude: restaurant.coordinates.latitude,
          longitude: restaurant.coordinates.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }}
      >
        <MapView.Marker
          key={restaurant.id}
          coordinate={restaurant.coordinates}
          title={restaurant.name}
          pinColor={'indigo'}
        />
      </MapView>
      <View style={styles.yelp}>
        <Text> You are going to... </Text>
        <Image source={{uri: restaurant.image_url}} style={styles.image} />
        <Text>{`Restaurant Name: ${restaurant.name}`}</Text>
        <Text>Address: {restaurant.location.display_address}</Text>
        <Text>{`Is It pricey? : ${restaurant.price}`}</Text>
        <Text>{`Phone: ${restaurant.display_phone}`}</Text>
        <Text>{restaurant.url}</Text>
      </View>
    </View>
  )
}


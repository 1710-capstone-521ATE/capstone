import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, TextInput, Image, TouchableHighlight, Dimensions} from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0092;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default (props) => {
  const restaurant = props.restaurant;

  return (
    <View style={styles.container}>
      <MapView
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
      <View>
        <Text> You are going to... </Text>
        <Image source={{uri: restaurant.image_url}} />
        <Text>{`Restaurant Name: ${restaurant.name}`}</Text>
        <Text>Address: {restaurant.location.display_address}</Text>
        <Text>{`Is It pricey? : ${restaurant.price}`}</Text>
        <Text>{`Phone: ${restaurant.display_phone}`}</Text>
        <Text>{restaurant.url}</Text>
      </View>
    </View>
  )
}


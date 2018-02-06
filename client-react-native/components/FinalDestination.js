import React from 'react';
import {Text, View, StyleSheet, Image, Dimensions, Linking, Button} from 'react-native';
import { MapView } from 'expo';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#62c2b5'
  },
  yelp: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    height: 150,
    width: 150,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  restaurantText: {
    fontWeight: '700',
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 12
  },
  nameText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 18
  }
});
let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0092;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function FinalDestination(props) {
  const restaurant = props.restaurant;

  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>{restaurant.name}</Text>
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
        <Image source={{uri: restaurant.image_url}} style={styles.image} />
        <Text style={styles.restaurantText}>Address: {restaurant.location.display_address}</Text>
        <Text style={styles.restaurantText}>{`Is It pricey? : ${restaurant.price}`}</Text>
        <Text style={styles.restaurantText}>{`Phone: ${restaurant.display_phone}`}</Text>
        <Button
          onPress={() => Linking.openURL(restaurant.url)}
          style={styles.restaurantText}
          title="More Yelp Info!" />
      </View>
    </View>
  )
}


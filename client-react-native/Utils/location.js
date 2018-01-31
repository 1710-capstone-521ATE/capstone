import { Permissions, Location } from 'expo';



export default _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted') {
      return ({
        locationResult: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    return ({latitude: location.coords.latitude, longitude: location.coords.longitude});
  }
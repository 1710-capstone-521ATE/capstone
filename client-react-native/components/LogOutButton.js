import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking
} from 'react-native';
import { Icon } from 'react-native-elements';

class LogOutButton extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <Icon
        reverse
        name='exit-to-app'
        color='#43CCD8'
        raised
        // onPress={()=>
      />
    )
  }
}

export default LogOutButton;

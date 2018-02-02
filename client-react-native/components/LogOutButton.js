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
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    console.log('OUR PROPS ',this.props);
    this.props.navigation.navigate('Main');
  }


  render() {
    console.log('THIS PROPS: ', this.props)
    return (
      <Icon
        reverse
        name='exit-to-app'
        color='#43CCD8'
        raised
        onPress={() => this.props.navigation.navigate('Main')}
      />
    )
  }
}

export default LogOutButton;

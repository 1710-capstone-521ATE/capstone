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
import { logout } from '../store';
import {connect} from 'react-redux';


class HomeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.clickHandler = this.clickHandler.bind(this);
  }

 clickHandler() {
    this.props.navigation.navigate("EventView")
}

  render() {
    return (
      <Icon
        reverse
        name='home'
        color='#43CCD8'
        raised
        onPress={this.clickHandler}
      />
    )
  }
}



export default connect(null, null)(HomeButton);
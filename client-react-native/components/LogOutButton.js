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


class LogOutButton extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.clickHandler = this.clickHandler.bind(this);
  }

async clickHandler() {
    console.log('OUR PROPS ',this.props);
    await this.props.signOut();
    console.log('what are pros?', this.props.navigation)
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
        onPress={() => this.clickHandler()}
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(logout())
  }
}


export default connect(null, mapDispatchToProps)(LogOutButton);

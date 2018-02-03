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
import { NavigationActions } from 'react-navigation';

class LogOutButton extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.clickHandler = this.clickHandler.bind(this);
  }

  async clickHandler() {
    await this.props.signOut();
    // dispatch an action that will 'clear routing history' in Stack Navigator and navigate user
    // back to Main page
    await this.props.navigation.dispatch(NavigationActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: 'Main' })]
    }))
}

  render() {
    return (
      <Icon
        reverse
        name='exit-to-app'
        color='#43CCD8'
        raised
        onPress={this.clickHandler}
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

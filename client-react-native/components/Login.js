import React, { Component } from 'react';
import LoginForm from './LoginForm';
import {StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight} from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { googleLogin } from '../store';

class Login extends Component {
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.logoContent}>
          <Image style={styles.logo} source={require('../assets/logo.png')} />
        </View>
        <LoginForm style={{ flex: 0 }} navigation={this.props.navigation} />
        <Text>OR</Text>
        <Button
          buttonStyle={styles.signupButtonContainer}
          onPress={() => this.props.navigation.navigate('SignUpForm')}
          rounded={true}
          title='SIGN UP'
          fontWeight='700'
          TouchableComponent='TouchableOpacity'
        >
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#62c2b5',
    // 43CCD8
  },
  logoContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 100,
    width: 100
  },
  signupButtonContainer: {
    backgroundColor: '#11b21f',
    paddingVertical: 10,
    marginBottom: 20,
    width: 300
  },
  loginbutton: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '700'
  },
  buttonContainer: {
    backgroundColor: '#1980b9',
    paddingVertical: 10,
    marginTop: 15,
    marginBottom: 10
  },
  redButtonContainer: {
    backgroundColor: '#FF0000',
    paddingVertical: 10,
    marginBottom: 10,
    width: 300
  }
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    googleLogin: (user) => dispatch(googleLogin(user, ownProps.navigation))
  }
}

export default connect(null, mapDispatchToProps)(Login);

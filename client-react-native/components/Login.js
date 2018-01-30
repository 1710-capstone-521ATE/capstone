import React, { Component } from 'react';
import LoginForm from './LoginForm';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
          <View style = {styles.logoConten}>
          <Text style = {styles.titleApp}>Welcome to 521ATE</Text>
          </View>
          <LoginForm style ={{flex: 0}} />
          <Text>OR</Text>
          <TouchableOpacity
            style = {styles.signupButtonContainer}
            onPress={() => this.props.navigation.navigate('SignUpForm')}
          >
          <Text style ={styles.loginbutton}>
          SIGNUP
          </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signupButtonContainer}
            onPress={() => this.props.navigation.navigate('MapTemp')}
          >
            <Text style={styles.loginbutton}>
              GO TO MAP
            </Text>
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#43CCD8',
  },
  logoConten: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleApp: {
    width: 200,
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff'
  },
  logo: {
    width: 100,
    height: 100
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
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
});

import React from 'react';
import LoginForm from './LoginForm';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import { googleLogin } from '../store';

function Login(props) {
  return (
    <View style={styles.container}>
      <View style = {styles.logoContent}>
        <Text style = {styles.titleApp}>Welcome to 521ATE</Text>
        <Image style={styles.corgo} source={{uri: 'https://i.imgur.com/k9i7YLN.jpg'}} />
      </View>
      <LoginForm style ={{flex: 0}} navigation={props.navigation} />
      <Text>OR</Text>
      <TouchableOpacity
        style = {styles.signupButtonContainer}
        onPress={() => props.navigation.navigate('SignUpForm')}
      >
        <Text style ={styles.loginbutton}>SIGNUP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#43CCD8',
  },
  logoContent: {
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
  corgo: {
    height: 300,
    width: 300
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

import React, {Component} from 'react';
import {KeyboardAvoidingView, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      dob: '',
      zipcode: ''
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    console.log('hi', event.target.value)
    let name = event.target.name;
    let value = event.target.value
    this.setState({[name]: value });
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior = "padding"
        style={styles.container}
        >
      <TextInput
      placeholder="First Name"
      name="firstName"
      onChangeText={(firstName) => this.setState({ firstName })}
      style = {styles.input}
      />
      <TextInput
      placeholder="Last Name"
      name="lastName"
      onChangeText={(lastName) => this.setState({ lastName })}
      style = {styles.input}
      />
      <TextInput
      placeholder="Email Address"
      name="email"
      onChangeText={(email) => this.setState({ email })}
      style = {styles.input}
      />
      <TextInput
      placeholder="Password"
      name="password"
      onChangeText={(password) => this.setState({ password })}
      style = {styles.input}
      />
      <TextInput
      placeholder="Date of Birth (yyyy-mm-dd)"
      name="dob"
      onChangeText={(dob) => this.setState({ dob })}
      style = {styles.input}
      />
      <TextInput
      placeholder="Zipcode"
      name="zipcode"
      onChangeText={(zipcode) => this.setState({ zipcode })}
      style = {styles.input}
      />
      <TouchableOpacity
      style = {styles.signupButtonContainer}
      onPress={() => console.log(this.state)}
    >
    <Text style ={styles.loginbutton}>
    SIGNUP
    </Text>
    </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#43CCD8',
  },
  input: {
    minWidth: 300,
    flexWrap: 'wrap',
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    color: '#fff',
    marginBottom: 10,
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
})

export default SignUpForm;

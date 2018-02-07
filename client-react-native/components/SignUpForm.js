import React, { Component } from 'react';
import { KeyboardAvoidingView, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { auth } from '../store';


class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
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
        autoCorrect = {false}
        autoCapitalize = "none"
        onChangeText={(firstName) => this.setState({ firstName })}
        style = {styles.input}
      />
      <TextInput
        placeholder="Last Name"
        name="lastName"
        autoCorrect = {false}
        autoCapitalize = "none"
        onChangeText={(lastName) => this.setState({ lastName })}
        style = {styles.input}
      />
      <TextInput
        placeholder="Email Address"
        name="email"
        autoCorrect = {false}
        autoCapitalize = "none"
        onChangeText={(email) => this.setState({ email })}
        style = {styles.input}
      />
        <TextInput
        placeholder="Password"
        name="password"
        secureTextEntry
        autoCorrect = {false}
        autoCapitalize = "none"
        onChangeText={(password) => this.setState({ password })}
        style = {styles.input}
      />
      <Button
        buttonStyle = {styles.signupButtonContainer}
        onPress={() => this.props.handleSubmit(this.state)}
        rounded={true}
        title='SIGN UP'
        fontWeight='700'
        TouchableComponent='TouchableOpacity'
      >
       </Button>
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
    backgroundColor: '#62c2b5',
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
  }
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSubmit(state) {
      dispatch(auth(state, ownProps.navigation, 'signup'))
    }
  }
}

const SignUpFormContainer = connect(null, mapDispatchToProps)(SignUpForm)

export default SignUpFormContainer;

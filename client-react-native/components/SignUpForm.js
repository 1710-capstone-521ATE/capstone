import React, {Component} from 'react';
import {View, Text, TextInput} from 'react-native';
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
    let name = event.target.name;
    let value = event.target.value
    this.setState({[name]: value});
  }

  render() {
    return (
      <View>
      <TextInput
      placeholder="First Name"
      value={this.state.firstName}
      name="firstName"
      onChangeText={this.onChange}
      />
      <TextInput
      placeholder="Last Name"
      value={this.state.lastName}
      name="lastName"
      onChangeText={this.onChange}
      />
      <TextInput
      placeholder="Email Address"
      value={this.state.email}
      name="email"
      onChangeText={this.onChange}
      />
      <TextInput
      placeholder="Password"
      value={this.state.password}
      name="password"
      onChangeText={this.onChange}
      />
      <TextInput
      placeholder="Date of Birth (yyyy-mm-dd)"
      value={this.state.dob}
      name="dob"
      onChangeText={this.onChange}
      />
      <TextInput
      placeholder="Zipcode"
      value={this.state.zipcode}
      name="zipcode"
      onChangeText={this.onChange}
      />
      </View>
    )
  }
}

export default SignUpForm;

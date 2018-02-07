import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../store';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, StatusBar } from 'react-native';
import { Button, Icon } from 'react-native-elements';

class LoginForm extends Component { //attached the prototype chain
  constructor(props) {
    super(props); //Component.call(this);
    this.state = {
      email: '',
      password: '',
    }
  }
  render() {
    return (
      <KeyboardAvoidingView behavior= "padding" style={styles.container}>
        <StatusBar
          barStyle= "light-content"
        />
        <View style={styles.viewContainer}>
        <Icon
          type='material-community'
          name='email-outline'
          color='rgba(255,255,255, 0.7)'
          outline={true}
        />
        <Text>    </Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#8c9393"
          returnKeyType="next"
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
          onSubmitEditing={() => this.passwordInput.focus()}
          style= {styles.input}
          name="email"
          onChangeText={(email) => this.setState({ email })}
        />
        </View>

        <View style={styles.viewContainer}>
        <Icon
          name='lock-outline'
          color='rgba(255,255,255, 0.7)'
          outline={true}
        />
        <Text>    </Text>
        <TextInput
          placeholder="Password"
          placeholderTextColor="#8c9393"
          secureTextEntry
          returnKeyType="go"
          ref={(input) => this.passwordInput = input}
          style={styles.input}
          name="password"
          onChangeText={(password) => this.setState({ password })}
        />
        </View>

        {/* logic for wrong username or password */}
        {(this.props.user.error)
          ?
          <Text style={styles.loginError}>
            {this.props.user.error}
          </Text>
          :
          null
        }

        <Button
        buttonStyle = {styles.buttonContainer}
        onPress = {() => {
          this.props.login(this.state)
          this.setState({loginAttempted: true})
          }
        }
        title='LOGIN'
        rounded={true}
        fontWeight='700'
        >
        <Text style ={styles.loginbutton}>LOGIN</Text>
        </Button>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  viewContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 10,
    paddingHorizontal: 10
  },
  input: {
    minWidth: 300,
    flexWrap: 'wrap',
    height: 40,
    color: '#fff',
    flex: 1
  },
  buttonContainer: {
    backgroundColor: '#1980b9',
    paddingVertical: 10,
    marginTop: 15,
    marginBottom: 10,
    width: 300
  },
  signupButtonContainer: {
    backgroundColor: '#11b21f',
    paddingVertical: 10,
    marginBottom: 20
  },
  loginbutton: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '700'
  },
  loginError: {
    color: '#F00',
    textAlign: 'center',
    fontWeight: '700'
  }
});

const mapStateToProps = (storeState) => {
  return {
    user: storeState.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: (user) => dispatch(auth(user, ownProps.navigation, 'login'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)

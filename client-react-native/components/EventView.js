import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import { connect } from 'react-redux';
import { fetchUsers } from '../store';

class EventView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventCode: ''
    }
  }

  componentDidMount() {
    this.props.loadUsers();
  }

  render() {
    let {currentUser} = this.props;
    console.log('what them props user bro?', this.props.currentUser)
    return (
      <View style={styles.container}>
        <Text>Hi {this.props.currentUser && this.props.currentUser.firstName}</Text>
        <TouchableOpacity
        style={styles.signupButtonContainer}
        onPress={() => this.props.navigation.navigate('AddUsers')}
        >
          <Text style={styles.loginbutton}>
            {`userProps bro ${this.props.currentUser.toString()}`}
          </Text>
        </TouchableOpacity>
        <Text>These Are Your Events</Text>
        {
          currentUser.events && currentUser.events.map(event => {
            if (event) {
              return (
                  <TouchableOpacity
                    key={event.id}
                    style={styles.signupButtonContainer}
                    onPress={() => console.log(this.state)}
                  >
                  <Text style={styles.loginbutton}>
                    {`${event.code}`}
                  </Text>
                  </TouchableOpacity>
              )} else {
              return null
            }
        })}

        <TextInput
          name="eventCode"
          placeholder="Type CODE Here"
          style={styles.input}
          onChangeText={(eventCode) => {this.setState({ eventCode })}}
        />
        <TouchableOpacity
          style={styles.signupButtonContainer}
          onPress={() => console.log(this.state)}
        >
          <Text style={styles.loginbutton}>
            JOIN EVENT
          </Text>
        </TouchableOpacity>
      </View>
    )
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
  input: {
    minWidth: 300,
    flexWrap: 'wrap',
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center'
  },
});

const mapStateToProps = (state) => {
  return {
    currentUser: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadUsers: () => dispatch(fetchUsers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventView);

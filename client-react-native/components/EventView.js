import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import { connect } from 'react-redux';
import { fetchUsers, fetchUserEvents } from '../store';
import socket from '../socket';
import _getLocationAsync from '../Utils/location'


class EventView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventCode: ''
    }
    this.joinRoomHandler = this.joinRoomHandler.bind(this);
    this.invitationHandler = this.invitationHandler.bind(this);
  }

  async componentDidMount() {
    this.props.loadUsers();
    this.props.loadUserEvents(this.props.currentUser.id);
  }

  async joinRoomHandler (user, event) {
    const userLocation = await _getLocationAsync();
    const data = {...userLocation, groupId: event.groupId, userId: user.id, eventCode: event.code}
    socket.emit('joinRoom', data);
  }

  invitationHandler (user, events, eventCode) {
    let verified = events.find(event => event.code === eventCode.toLowerCase())
    if (verified) this.joinRoomHandler(user, verified)
    else this.setState({eventCode: ''});
  }

  render() {
    let {userEvents, currentUser} = this.props;
    // this.props.currentUser && console.log('what them props user bro?', this.props.currentUser)
    return (
      <View style={styles.container}>
        <Text>Hi {this.props.currentUser && this.props.currentUser.firstName}</Text>
        <TouchableOpacity
        style={styles.signupButtonContainer}
        onPress={() => this.props.navigation.navigate('AddUsers')}
        >
          <Text style={styles.loginbutton}>
            CREATE EVENT
          </Text>
        </TouchableOpacity>
        <Text>These Are Your Events</Text>
        {
          userEvents && userEvents.map(event => {
            if (event) {
              return (
                  <TouchableOpacity
                    key={event.id}
                    style={styles.signupButtonContainer}
                    onPress={() => this.joinRoomHandler(currentUser, event)}
                  >
                  <Text style={styles.loginbutton}>
                    {`Please join ${event.code}`}
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
          value={this.state.eventCode}
          onChangeText={(eventCode) => {this.setState({ eventCode })}}
        />
        <TouchableOpacity
          style={styles.signupButtonContainer}
          onPress={() => this.invitationHandler(currentUser, userEvents, this.state.eventCode)}
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
    currentUser: state.user,
    userEvents: state.userEvents
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadUsers: () => dispatch(fetchUsers()),
    loadUserEvents: (id) => dispatch(fetchUserEvents(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventView);

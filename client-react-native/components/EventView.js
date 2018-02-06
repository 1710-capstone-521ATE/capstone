import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView, RefreshControl} from 'react-native';
import { connect } from 'react-redux';
import { fetchUsers, fetchUserEvents, addEventCode, clearingRestaurants, clearingBallot} from '../store';
import socket from '../socket';
import _getLocationAsync from '../Utils/location'
import LogOutButton from './LogOutButton'


class EventView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventCode: '',
      refreshing: false
    }
    this.joinRoomHandler = this.joinRoomHandler.bind(this);
    this.rejectRoomHandler = this.rejectRoomHandler.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  async componentDidMount() {
    this.props.loadUsers();
    this.props.loadUserEvents(this.props.currentUser.id);
    this.props.clearRestaurants();
    this.props.clearBallot();
  }

  async joinRoomHandler (user, event) {
    const userLocation = await _getLocationAsync();
    const data = {...userLocation, groupId: event.groupId, userId: user.id, eventCode: event.code}
    socket.emit('joinRoom', data);
    this.props.navigation.navigate('WaitingRoom');
  }

  async rejectRoomHandler(user, event) {
    const data = {userId:user.id, groupId: event.groupId, eventCode: event.code}
    socket.emit('declineInvite', data);
  }

  async onRefresh(){
    this.setState({refreshing: true})
    await this.props.loadUserEvents(this.props.currentUser.id)
    this.setState({refreshing: false})
  }

  render() {
    let {userEvents, currentUser} = this.props;
    return (
      <View style={styles.container}>
        <Text>Hi {this.props.currentUser && this.props.currentUser.firstName}</Text>


        <Text>These Are Your Events</Text>
        {
          (!this.state.refreshing) ?
          <Text>Pull Down to Update!</Text>
        :
          <Text></Text>
        }

          <ScrollView
            refreshControl={
              <RefreshControl
              refreshing = {this.state.refreshing}
              onRefresh= {this.onRefresh}
              />
            }
          >

          {userEvents && userEvents.map(event => {
            if (event) {
              return (
                <View>
                  <TouchableOpacity
                    key={event.id}
                    style={styles.signupButtonContainer}

                    onPress={() => this.joinRoomHandler(currentUser, event)}
                  >
                    <Text style={styles.loginbutton}>
                      {`Please join ${event.name}`}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    key={event.id}
                    style={styles.signupButtonContainer}

                    onPress={() => this.rejectRoomHandler(currentUser, event)}
                  >
                    <Text style={styles.loginbutton}>
                      Bye Felicia!
                    </Text>
                  </TouchableOpacity>
                </View>
              )} else {
              return null
            }
        })}
          </ScrollView>


        <TouchableOpacity
        style={styles.signupButtonContainer}
        onPress={() => this.props.navigation.navigate('AddUsers')}
        >
          <Text style={styles.loginbutton}>
            CREATE EVENT
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
    loadUserEvents: (id) => dispatch(fetchUserEvents(id)),
    clearRestaurants: () => dispatch(clearingRestaurants()),
    clearBallot: () => dispatch(clearingBallot())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventView);

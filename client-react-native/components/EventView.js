import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Text, View, StyleSheet, TouchableOpacity, ScrollView, RefreshControl} from 'react-native';
import { Button } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { fetchUsers, fetchUserEvents, addEventCode, clearingRestaurants, clearingBallot} from '../store';
import socket from '../socket';
import _getLocationAsync from '../Utils/location'
import LogOutButton from './LogOutButton'


class EventView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventCode: '',
      refreshing: false,
    }

    this.joinRoomHandler = this.joinRoomHandler.bind(this);
    this.rejectRoomHandler = this.rejectRoomHandler.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.selectStyleHandler = this.selectStyleHandler.bind(this);
  }

  async componentDidMount() {
    this.props.loadUsers();
    this.props.loadUserEvents(this.props.currentUser.id);
    this.props.clearRestaurants();
    this.props.clearBallot();
  }

  async joinRoomHandler (user, event) {
    const userLocation = await _getLocationAsync();
    const data = {...userLocation, groupId: event.groupId, userId: user.id, eventCode: event.code, isAttending: true}
    socket.emit('joinRoom', data);
    this.props.navigation.navigate('WaitingRoom');
  }

  async rejectRoomHandler(user, event) {
    const data = {userId:user.id, groupId: event.groupId, eventCode: event.code, isAttending: false}
    socket.emit('joinRoom', data);
    this.props.navigation.navigate('EventView');
  }

  async onRefresh(){
    this.setState({refreshing: true})
    await this.props.loadUserEvents(this.props.currentUser.id)
    this.setState({refreshing: false})
  }

  selectStyleHandler(eventCode) {
    return (this.state.eventCode === eventCode);
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
                <View
                  key={event.code}
                  style={styles.rowContainer}
                >
                  <Button
                    onPress={() => this.joinRoomHandler(currentUser, event)}
                    buttonStyle={styles.buttonContainer}
                    title={`Join ${event.name}`}
                    rounded={true}
                  />
                  <Icon
                    reverse
                    name='highlight-off'
                    color='#F04610'
                    onPress={() => this.rejectRoomHandler(currentUser, event)}
                  />
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
    backgroundColor: '#62c2b5',
  },
  rowContainer:{
    flexDirection: 'row',
  },
  buttonContainer: {
    flex:1,
    backgroundColor: '#1980b9',
    marginTop: 15,
    marginBottom: 10,
    width: 250
  },
  buttonDeclineContainer: {
    flex:1,
    backgroundColor: '#1980b9',
    marginTop: 15,
    marginBottom: 10,
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
  declineButton: {
    backgroundColor: '#F04610',
    textAlign: 'center',
    fontWeight: '700'
  }
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

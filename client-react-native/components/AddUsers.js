import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, Button, TouchableOpacity } from 'react-native';
import { createAndFetchGroup } from '../store';
import socket from '../socket'
import _getLocationAsync from '../Utils/location'

class AddUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newGroup: [],
      location: {},
      locationResult: ''
    };
    this.buttonHandler = this.buttonHandler.bind(this);
    this.addFriendsHandler = this.addFriendsHandler.bind(this);

  }

  buttonHandler(user) {
    if (this.state.newGroup.includes(user.id)) {
      this.setState({newGroup: this.state.newGroup.filter(id => Number(id) !== Number(user.id))})
    }
    else {
      this.setState({newGroup: this.state.newGroup.concat(user.id)})
    }
  }

  async addFriendsHandler(userIds, hostId) {
    await this.props.createGroup(userIds, hostId);
    const {event} = this.props;
    const userLocation = await _getLocationAsync();
    const data = {...userLocation, groupId: event.groupId, hostId: hostId, eventId: event.eventId}

    socket.emit('joinRoom', data);
    this.props.navigation.navigate('WaitingRoom')

  }

  render() {
    let { users, user } = this.props;
    let { newGroup } = this.state;
    let filteredUsers = users.filter(u => Number(u.id) !== user.id);

    return (
      <View style={styles.container}>
        <ScrollView>
          {
            filteredUsers.map(user => (
              <Button
                key={user.id}
                title={`${user.firstName} ${user.lastName} ${user.email}`}
                onPress={() => this.buttonHandler(user)} />
            ))
          }
        </ScrollView>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {this.addFriendsHandler(newGroup, user.id)}}
        >
          <Text style={styles.loginbutton}>
            INVITE FRIENDS
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    user: state.user,
    event: state.event
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createGroup: (userIds, hostId) => dispatch(createAndFetchGroup(userIds, hostId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddUsers);


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

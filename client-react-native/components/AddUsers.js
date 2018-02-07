import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { createAndFetchGroup } from '../store';
import socket from '../socket';
import _getLocationAsync from '../Utils/location';

class AddUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newGroup: [],
      eventName: '',
      searchName: ''
    };
    this.userPressHandler = this.userPressHandler.bind(this);
    this.addFriendsHandler = this.addFriendsHandler.bind(this);
    this.selectStyleHandler = this.selectStyleHandler.bind(this);
  }

  userPressHandler(user) {
    if (this.state.newGroup.includes(user.id)) {
      this.setState({newGroup: this.state.newGroup.filter(id => Number(id) !== Number(user.id))});
    }
    else {
      this.setState({newGroup: this.state.newGroup.concat(user.id)});
    }
  }

  async addFriendsHandler(userIds, hostId, eventName) {
    await this.props.createGroup(userIds, hostId, eventName);
    const {event} = this.props;
    const userLocation = await _getLocationAsync();
    const data = {...userLocation, groupId: event.groupId, userId: hostId, eventCode: event.eventCode};
    socket.emit('joinRoom', data);
    this.props.navigation.navigate('WaitingRoom');
  }

  selectStyleHandler(user) {
    return (this.state.newGroup.find(userId => Number(userId) === Number(user.id)));
  }

  render() {
    let { users, user } = this.props;
    let { newGroup, eventName } = this.state;
    let filteredUsers = users.filter(u => Number(u.id) !== user.id);

    return (
      <View style={styles.container}>

        {/* Allows you to name your event */}
        <TextInput
        placeholder="Name your event!"
        onChangeText={(eventName) => this.setState({ eventName })}
        style={styles.input}
        />

        {/* Allows you to filter your friends */}
        <TextInput
          placeholder="Search for friends!"
          onChangeText={(searchName) => this.setState({ searchName })}
          style={styles.input}
        />

        <ScrollView>
          {
            filteredUsers.filter((ele) => {return ele.fullName.includes(this.state.searchName)}).map(user => (
              <Button
                key={user.id}
               buttonStyle={this.selectStyleHandler(user) ? styles.selectedContainer : styles.buttonContainer}
                onPress={() => this.userPressHandler(user)}
                title={`${user.firstName} ${user.lastName}`}
                rounded={true}
              >
                <Text style={styles.loginbutton}>
                {user.firstName} {user.lastName}
                </Text>
              </Button>
            ))
          }
        </ScrollView>
        <Button
          color='#1980b9'
          buttonStyle={styles.inviteFriendsContainer}
          onPress={() => {this.addFriendsHandler(newGroup, user.id, eventName)}}
          title="INVITE FRIENDS"
          rounded={true}
          outline={true}
        >
        </Button>
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
    createGroup: (userIds, hostId, eventName) => dispatch(createAndFetchGroup(userIds, hostId, eventName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddUsers);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#62c2b5',
  },
  inviteFriendsContainer: {
    position: 'relative',
    borderColor: '#1980b9',
    borderWidth: 2.5,
    paddingVertical: 10,
    marginTop: 35,
    marginBottom: 20,
    width: 300,
    bottom: 25
  },
  selectedContainer: {
    backgroundColor: '#00414c',
    marginTop: 15,
    marginBottom: 10,
    width: 300
  },
  buttonContainer: {
    backgroundColor: '#1980b9',
    marginTop: 15,
    marginBottom: 10,
    width: 300
  },
  loginbutton: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '700'
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
  }
});

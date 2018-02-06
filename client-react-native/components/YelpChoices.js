import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import socket from '../socket';
import { Button } from 'react-native-elements';

class YelpChoices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: ''
    }
    this.voteHandler = this.voteHandler.bind(this);
  }

  voteHandler() {
    if (this.state.selection) {
      socket.emit('vote', this.state.selection, this.props.event.eventCode);
      this.props.navigation.navigate('ResultView');
    }
  }

  render() {
    let { notRespondedUsers, event, isHost } = this.props;
    return (
      <View style={styles.container}>
        {(this.props.restaurants.length > 0)
          ?
        <View>
        {this.props.restaurants.map((restaurant) => {
          return (<TouchableOpacity
            key={restaurant.id}
            style={this.state.selection === restaurant.name ? styles.selectedButtonContainer : styles.buttonContainer}
            onPress={() => this.setState({selection: restaurant.name})}>
            <Text style={styles.button}>
              {restaurant.name}
            </Text>
          </TouchableOpacity>)
        })}

          <TouchableOpacity
style={styles.voteContainer}
          onPress={this.voteHandler}
          >
            <Text style={styles.button}>
              VOTE
            </Text>
          </TouchableOpacity>
        </View>

          :

        <View>
          <Text>Waiting on .... </Text>
          {
            notRespondedUsers.map(user => (<Text key={user.id}>{user.fullName}</Text>))
          }
          {isHost &&
          (<Button
          title="Proceed to voting"
          onPress={() => socket.emit('overrideWaitingRoom', {users: notRespondedUsers, event})}
          />)}
        </View>
      }

      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#62c2b5'
    },
    corgo: {
        height: 300,
        width: 300
    },
    buttonContainer: {
      backgroundColor: '#009ba7',
      paddingVertical: 10,
      marginBottom: 10,
      width: 300
    },
    button: {
      color: '#ffffff',
      textAlign: 'center',
      fontWeight: '700'
    },
    selectedButtonContainer: {
      backgroundColor: '#00414c',
      paddingVertical: 10,
      marginBottom: 10,
      width: 300
    },
    voteContainer: {
      backgroundColor: '#11b21f',
      paddingVertical: 10,
      marginBottom: 10,
      width: 300
    },
});

const mapStateToProps = (state) => {
  return {
    restaurants: state.restaurants,
    event: state.event,
    notRespondedUsers: state.users.filter(user => user.coords && user.coords.latitude === null),
    isHost: Number(state.user.id) === Number(state.event.hostId)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, null)(YelpChoices);

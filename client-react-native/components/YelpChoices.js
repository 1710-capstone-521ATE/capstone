import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, TextInput, Image, TouchableHighlight} from 'react-native';
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

  componentDidMount() {
  }

  voteHandler() {
    if (this.state.selection) socket.emit('vote', this.state.selection, this.props.event.eventCode);
    this.props.navigation.navigate('ResultView');
  }

  render() {
    let { notRespondedUsers, event } = this.props;
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
style={styles.buttonContainer}
          onPress={this.voteHandler}>
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
          <Button
          title="Proceed to voting"
          onPress={() => socket.emit('overrideWaitingRoom', {users: notRespondedUsers, event})}
          />
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
      backgroundColor: '#43CCD8'
    },
    corgo: {
        height: 300,
        width: 300
    },
    buttonContainer: {
      backgroundColor: '#009ba7',
      paddingVertical: 10,
      marginBottom: 20,
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
      marginBottom: 20,
      width: 300
    }
});

const mapStateToProps = (state) => {
  return {
    restaurants: state.restaurants,
    event: state.event,
    notRespondedUsers: state.users.filter(user => user.coords && user.coords.latitude === null)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, null)(YelpChoices);

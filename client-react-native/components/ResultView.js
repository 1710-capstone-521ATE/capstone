import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import FinalDestination from './FinalDestination';
import { Button } from 'react-native-elements';
import socket from '../socket';

class ResultView extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }

    this.winnerHandler = this.winnerHandler.bind(this)
    this.voteCounter = this.voteCounter.bind(this)
  }

  winnerHandler(){
   const {ballot, restaurants} = this.props;
   let winner = 0;
   for (let restaurant in ballot) {
     if (ballot[restaurant] > (ballot[winner] || 0)){
       winner = restaurant
     }
   }
   let restaurant = restaurants.find(res => res.name === winner);
    return (
      <FinalDestination restaurant={restaurant} />
    )
  }

  voteCounter(){
    const ballot = this.props.ballot;
    let votes = 0;
    for (let restaurant in ballot){
      votes += ballot[restaurant]
    }

    return votes
  }


  render() {
    const {restaurants, ballot, isHost, event} = this.props;
    let navigate = this.props.navigation.navigate;
    console.log('this is navigate on FE', navigate);
    return (this.voteCounter() < this.props.users.length && !event.override) ?
      (<View style={styles.container}>
        {restaurants.map(restaurant => {
          let count = ballot[restaurant.name] || 0
          return (
            <Text style = {styles.restaurantText} key={restaurant.name}>{`${restaurant.name} : ${count}`}</Text>
          )}
        )}
        <Text style={styles.restaurantText}> Waiting for Results! </Text>
        {isHost &&
        <Button
          title="Override Votes!"
          onPress={() => socket.emit('override', event, navigate.toString())}
        />}
      </View>)
      :
      this.winnerHandler()
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#62c2b5',
    },
    corgo: {
        height: 300,
        width: 300
    },
    restaurantText: {
      fontWeight: '700',
      textAlign: 'center',
      color: '#ffffff'
    },
    winner: {
      fontSize: 30,
      fontWeight: '800',
      color: '#ffffff'
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
});

const mapStateToProps = (state) => {
  return {
    restaurants: state.restaurants,
    users: state.users,
    ballot: state.ballot,
    isHost: Number(state.user.id) === Number(state.event.hostId),
    event: state.event
  }
}

export default connect(mapStateToProps)(ResultView);

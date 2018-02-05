import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, TextInput, Image, TouchableHighlight} from 'react-native';
import { connect } from 'react-redux';
import FinalDestination from './FinalDestination';

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

    const {users, restaurants, ballot} = this.props;

    return (
      <View style={styles.container}>
        {restaurants.map(restaurant => {
          let count = ballot[restaurant.name] || 0
          return (
            <Text style = {styles.restaurantText} key={restaurant.name}>{`${restaurant.name} : ${count}`}</Text>
          )}
        )}
        <View>
        {(this.voteCounter() < this.props.users.length)
          ? <Text> Waiting for Results! </Text>
          : this.winnerHandler()}
        </View>
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
    }
});

const mapStateToProps = (state) => {
  return {
    restaurants: state.restaurants,
    users: state.users,
    ballot: state.ballot
  }
}


export default connect(mapStateToProps)(ResultView);

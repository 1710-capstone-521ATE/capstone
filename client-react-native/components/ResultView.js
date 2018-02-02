import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, TextInput, Image, TouchableHighlight} from 'react-native';
import { connect } from 'react-redux';

class ResultView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }


  render() {

    const {users, restaurants, ballot} = this.props;

    return (
      <View>
        {restaurants.map(restaurant => {
          let count = ballot[restaurant.name] || 0
          return (
            <Text key={restaurant.name}>{`${restaurant.name} : ${count}`}</Text>
          )}
        )}

        <Text>
        HELLO FRONDS
        </Text>
        <Image style={styles.corgo} source={{uri: 'https://i.imgur.com/k9i7YLN.jpg'}} />

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

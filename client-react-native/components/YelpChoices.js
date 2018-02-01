import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, TextInput, Image} from 'react-native';
import { connect } from 'react-redux';



class YelpChoices extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {

    return (
      <View style={styles.container}>
        {(this.props.restaurants.length > 0)

          ?

        this.props.restaurants.slice(0, 5).map((restaurant) => {
          return <TouchableOpacity
            key={restaurant.id}
            style={styles.buttonContainer}>
            <Text style={styles.button}>
              {restaurant.name}
            </Text>
          </TouchableOpacity>
        })


          :

        <View>
        <Text>
        HELLO FRONDS
        </Text>
        <Image style={styles.corgo} source={{uri: 'https://i.imgur.com/k9i7YLN.jpg'}} />

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
    }
});

const mapStateToProps = (state) => {
  return {
    restaurants: state.restaurants
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, null)(YelpChoices);

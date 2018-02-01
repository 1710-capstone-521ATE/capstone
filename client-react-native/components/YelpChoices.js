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
    console.log(this.state.restaurants)
  }

  render() {
    console.log("restaurants: ", this.props.restaurants)
   
    return (
      <View>
        {(this.props.restaurants.length > 0)
        
          ?
        
        <Text>
        {this.props.restaurants.map((restaurant) => {
          console.log(restaurant.name)
        })}
        </Text>
          
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
    corgo: {
        height: 300,
        width: 300
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

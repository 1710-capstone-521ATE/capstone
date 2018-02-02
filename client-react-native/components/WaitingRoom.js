import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import { connect } from 'react-redux';
import Map from './Map'
import YelpChoices from './YelpChoices'
// import { fetchUsers, fetchUserEvents } from '../store';

class WaitingRoom extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
componentDidMount(){

  }



render() {
    return(
        <View style = {styles.container}>
        <Map />
        <YelpChoices navigation={this.props.navigation}/>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

const mapStateToProps = (state) => {
    return{
        restaurants: state.restaurants
    }
}

export default connect(null, null)(WaitingRoom)

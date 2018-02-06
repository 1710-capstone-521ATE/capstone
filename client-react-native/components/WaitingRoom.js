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

render() {
    return (
        <View style = {styles.container}>
        <Text>
            {this.props.event.name}
        </Text>
        <Map />
        <YelpChoices navigation={this.props.navigation} />
        </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#62c2b5',
        alignItems: 'center'
    }
})

const mapStateToProps = (state) => {
    return {
        restaurants: state.restaurants,
        event: state.event
    }
}

export default connect(mapStateToProps, null)(WaitingRoom)

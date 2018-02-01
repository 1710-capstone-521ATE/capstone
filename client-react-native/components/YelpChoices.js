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
      <View>
      <Text>
      HELLO FRONDS
      </Text>
      <Image style={styles.corgo} source={{uri: 'https://i.imgur.com/k9i7YLN.jpg'}} />
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

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(null, null)(YelpChoices);

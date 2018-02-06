import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking
} from 'react-native';
import { Icon } from 'react-native-elements';
import { logout } from '../store';
import {connect} from 'react-redux';

export default function(props) {
  
    return (
      <Icon
        reverse
        name='home'
        color='#43CCD8'
        raised
        onPress={() => props.navigation.navigate("EventView")}
      />
    )
  }





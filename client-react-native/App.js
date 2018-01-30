import React from 'react';
import { Provider } from 'react-redux'
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Login from './components/Login';
import SignUpFormContainer from './components/SignUpForm';
import store from './store';
import Map from './components/Map';
import MapTemp from './components/MapTemp';
import EventView from './components/EventView';
import AddUsers from './components/AddUsers';
import './socket';

const RootNavigator = StackNavigator({
  Main: {
    screen: Login,
    navigationOptions: {
        headerTitle: 'Login'
    }
  },
  SignUpForm: {
    screen: SignUpFormContainer,
    navigationOptions: {
      headerTitle: 'Signup'
    }
  },
  Map: {
    screen: Map,
    navigationOptions: {
      headerTitle: '(/ﾟДﾟ)/'
    }
  },
  MapTemp: {
    screen: MapTemp,
    navigationOptions: {
      headerTitle: '(/ﾟДﾟ)/'
    }
  },
  EventView: {
    screen: EventView,
    navigationOptions: {
      headerTitle: 'Event?'
    }
  },
  AddUsers: {
    screen: AddUsers,
    navigationOptions: {
      headerTitle: 'AddUsers'
    }
  }
});

export default class App extends React.Component {
  render() {
    return (
     <Provider store={store}>
        <RootNavigator />
      </Provider>
    );
  }
}


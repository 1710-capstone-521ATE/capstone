import React from 'react';
import { Provider } from 'react-redux'
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Login from './components/Login';
import SignUpFormContainer from './components/SignUpForm';
import store from './store';
import Map from './components/Map';
import EventView from './components/EventView';
import AddUsers from './components/AddUsers';
import WaitingRoom from './components/WaitingRoom';
import YelpChoices from './components/YelpChoices';
import ResultView from './components/ResultView';
import LogOutButton from './components/LogOutButton';
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
  EventView: {
    screen: EventView,
    navigationOptions: {
      headerTitle: 'Event',
      headerLeft: null,
      headerRight: <LogOutButton />
    }
  },
  AddUsers: {
    screen: AddUsers,
    navigationOptions: {
      headerTitle: 'AddUsers',
      headerLeft: null
    }
  },
  WaitingRoom: {
    screen: WaitingRoom,
    navigationOptions: {
      headerTitle: 'Waiting Room',
    }
  },
  YelpChoices: {
    screen: YelpChoices,
    navigationOptions: {
      headerTitle: 'Yelp Choices'
    }
  },
  ResultView: {
    screen: ResultView,
    navigationOptions: {
      headerTitle: 'Votes!',
      headerLeft: null
    }
  },
  LogOutButton: {
    screen: LogOutButton,
    navigationOptions:{

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


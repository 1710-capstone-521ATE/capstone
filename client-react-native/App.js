import React from 'react';
import { Provider } from 'react-redux'
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Login from './components/Login';
import SignUpFormContainer from './components/SignUpForm';
import store from './store';
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
  EventView: {
    screen: EventView,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Event',
      headerLeft: null,
      gesturesEnabled: false,
      headerRight: <LogOutButton navigation={navigation} />
    })
  },
  AddUsers: {
    screen: AddUsers,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'AddUsers',
      headerLeft: null,
      gesturesEnabled: false,
      headerRight: <LogOutButton navigation={navigation} />
    })
  },
  WaitingRoom: {
    screen: WaitingRoom,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Waiting Room',
      headerRight: <LogOutButton navigation={navigation} />
    })
  },
  YelpChoices: {
    screen: YelpChoices,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Yelp Choices',
      headerRight: <LogOutButton navigation={navigation} />
    })
  },
  ResultView: {
    screen: ResultView,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Votes!',
      headerLeft: null,
      gesturesEnabled: false,
      headerRight: <LogOutButton navigation={navigation} />
    })
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


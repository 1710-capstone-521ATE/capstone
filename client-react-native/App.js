import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Login from './components/Login';
import SignUpForm from './components/SignUpForm';
import Map from './components/Map.js';

export default StackNavigator({
  // Main: {
  //   screen: Login,
  //   navigationOptions: {
  //       headerTitle: 'Login'
  //   }
  // },
  // SignUpForm: {
  //   screen: SignUpForm,
  //   navigationOptions: {
  //     headerTitle: 'Signup'
  //   }
  // },
  Map: {
    screen: Map,
    navigationOptions: {
      headerTitle: 'DIS WHERE YOU BE!'
    }
  }
});

// export default class App extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Open up App.js to start working on your app!</Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

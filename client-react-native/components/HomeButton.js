import React from 'react';
import { Icon } from 'react-native-elements';

export default function(props) {

    return (
      <Icon
        reverse
        name='home'
        color='#62c2b5'
        raised
        onPress={() => props.navigation.navigate("EventView")}
      />
    )
  }





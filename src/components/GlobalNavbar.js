import React from 'react';
import { View, Button } from 'react-native';

function GlobalNavbar({ navigation }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Button
        title="Button 1"
        onPress={() => {
          // Handle button 1 click here
        }}
      />
      <Button
        title="Button 2"
        onPress={() => {
          // Handle button 2 click here
        }}
      />
    </View>
  );
}

export default GlobalNavbar;

import React from 'react';
import {View, StyleSheet} from 'react-native';
import HomeScreen from './src/Screens/homeScreen';
import {Provider} from 'react-redux';
import store from './src/store/store';

function App() {
  return (
    <Provider store={store}>
      <View>
        <HomeScreen />
      </View>
    </Provider>
  );
}

export default App;

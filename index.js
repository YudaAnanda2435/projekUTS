import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/Navigation/AppNavigator';
import { name as appName } from './app.json';
// import App from './App';

const App = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

AppRegistry.registerComponent(appName, () => App);

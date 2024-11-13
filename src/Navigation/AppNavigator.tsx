// src/navigation/AppNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/welcomeScreen';
import Dog from '../screens/Dog';
import TitipanScreen from '../screens/TitipanScreen';
import Cat from '../screens/Cat';
import Rabbit from '../screens/Rabbit';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="welcome">
      <Stack.Screen
        name="welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Dog" component={Dog} />
      <Stack.Screen name="Cat" component={Cat} />
      <Stack.Screen name="Rabbit" component={Rabbit} />
      <Stack.Screen name="Titipan" component={TitipanScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;



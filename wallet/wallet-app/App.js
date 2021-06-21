import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SearchFrame, ProfileFrame, RequestsFrame } from './components/frames/dummy';


export default function App() {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Search" component={SearchFrame}/>
        <Stack.Screen name="Profile" component={ProfileFrame} />
        <Stack.Screen name="Requests" component={RequestsFrame}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2FFF12',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

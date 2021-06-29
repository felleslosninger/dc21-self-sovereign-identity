import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

//import Test from './components/test'
//import { generateKeyPair, signing } from './utils/signing';
//import {sign} from './utils.sign';
//import { signDemo } from './utils/sign' ;
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RequestFrame from './components/frames/RequestFrame';
import ActivityFrame from './components/frames/ActivityFrame';
import ProofOverviewFrame from './components/frames/ProofOverviewFrame';
import VerifierLogFrame from './components/frames/VerifierLogFrame';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/*<Stack.Screen name="Search" component={SearchFrame}/>
        <Stack.Screen name="Profile" component={ProfileFrame} />*/}
        <Stack.Screen name="Oversikt" component={ProofOverviewFrame} />
        <Stack.Screen name="Forespørsler" component={RequestFrame} />
        <Stack.Screen name="Aktivitet" component={ActivityFrame} />
        <Stack.Screen name="Delt med" component={VerifierLogFrame} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87D7BF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
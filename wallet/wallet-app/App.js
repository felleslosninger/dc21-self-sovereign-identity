import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import store from './redux/configureStore';
import { Provider } from 'react-redux';

//import Test from './components/test'
//import { generateKeyPair, signing } from './utils/signing';
//import {sign} from './utils.sign';
//import { signDemo } from './utils/sign' ;
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RequestFrame from './components/frames/RequestFrame';
import ActivityFrame from './components/frames/ActivityFrame';
import ProofOverviewFrame from './components/frames/ProofOverviewFrame';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {/*<Stack.Screen name="Search" component={SearchFrame}/>
        <Stack.Screen name="Profile" component={ProfileFrame} />*/}
          <Stack.Screen name="Oversikt" component={ProofOverviewFrame} />
          <Stack.Screen name="Forespørsler" component={RequestFrame} />
          <Stack.Screen name="Aktivitet" component={ActivityFrame} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
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

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import Knapp from './components/Godtaknapp'
//import Test from './components/test'
//import { generateKeyPair, signing } from './utils/signing';
//import {sign} from './utils.sign';
//import { signDemo } from './utils/sign';

export default function App() {

  return (
    <View style={styles.container}>
      {/* {/*<Text>{() => signDemo()}</Text>} */}
      <Knapp/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefae0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import MenuButtons from './components/menu';


export default function App() {

  return (
    <View style={styles.container}>
      <Text>Lommeboka!</Text>
      <StatusBar style="auto" />
      <MenuButtons/>
    </View>
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



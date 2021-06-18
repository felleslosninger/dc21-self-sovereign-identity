import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View} from 'react-native';


export default function App() {

  return (
    <View style={styles.container}>
      <Text style>Lommeboka!</Text>
      <StatusBar style="auto" />
    </View>
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



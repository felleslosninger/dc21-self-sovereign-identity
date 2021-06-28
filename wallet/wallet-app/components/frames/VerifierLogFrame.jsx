import React from 'react';
import { Text, StyleSheet } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import Menu from '../Menu';
import Verifier from '../Verifier';

export default function VerifierLogFrame() {



  const styles = StyleSheet.create({
    shared: {
      fontSize: 20,
    },
  })


  return (
    <SafeAreaView>
      <Text style={styles.shared}> Du har delt beviset med disse tjenestene.</Text>
      <Verifier/>
      <Menu />
    </SafeAreaView>
  );
}
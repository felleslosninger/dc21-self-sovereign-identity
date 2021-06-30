import React from 'react';
import { Text, StyleSheet } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import Menu from '../Menu';
import Verifier from '../Verifier';

export default function VerifierLogFrame({route}) {

  const styles = StyleSheet.create({
    shared: {
      fontSize: 20,
    },
  })


  return (
    <SafeAreaView>
      <Text style={styles.shared}>Du har delt beviset {route.params.item.proof} med disse tjenestene.</Text>
      {route.params.item.verifiers.map(
              (verifier, vid) => <Verifier key={vid} name={verifier}/>
              )}
      <Menu />
    </SafeAreaView>
  );
}
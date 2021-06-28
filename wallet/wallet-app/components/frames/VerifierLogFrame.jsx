import React from 'react';
import { Text } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import Menu from '../Menu';

export default function VerifierLog() {
  return (
    <SafeAreaView>
      <Text>Du har delt beviset ditt med disse tjenestene.</Text>
      <Menu />
    </SafeAreaView>
  );
}
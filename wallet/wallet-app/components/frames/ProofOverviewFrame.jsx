import React from 'react';

import { SafeAreaView, StyleSheet } from 'react-native';
import Menu from '../Menu';
import Proof from '../Proof';

export default function ProofOverviewFrame() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: '12%',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Proof />
      <Menu></Menu>
    </SafeAreaView>
  );
}
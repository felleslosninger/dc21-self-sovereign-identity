import React from 'react';

import { SafeAreaView, Text, FlatList, View, StyleSheet } from 'react-native';
import Menu from '../Menu';
import { Knapp } from '../ConsentButton';

export default function ProofOverviewFrame() {
  const proofs = [
    {
      id: Math.random().toString(),
      proof: 'over-18',
    },
    {
      id: Math.random().toString(),
      proof: 'er-sykepleier',
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: '12%',
    },
    theProofs: {
      backgroundColor: 'lightgrey',
      padding: 10,
      fontSize: 20,
      marginVertical: 3,
      marginHorizontal: 16,
      borderRadius: 4,
      alignItems: 'center',
    },
    textProofs: {
      fontSize: 40,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={proofs}
        renderItem={({ item }) => (
          <View style={styles.theProofs}>
            <Text style={styles.textProofs}> {item.proof}</Text>
            <Knapp></Knapp>
          </View>
        )}
      />
      <Menu></Menu>
    </SafeAreaView>
  );
}

import React, { useEffect, useState } from 'react';

import { SafeAreaView, Text, FlatList, View, StyleSheet, Button } from 'react-native';
import Menu from '../Menu';
import Knapp from '../Knapp';

import AsyncStorage from '@react-native-community/async-storage';

export default function ProofOverviewFrame() {
  const [theProof, setTheProof] = useState('');

  const getProof = async () => {
    try {
      const value = await AsyncStorage.getItem('key');
      if (value !== null) {
        console.log(value);
        setTheProof(value);
      }
    } catch (error) {
      alert(error);
    }
  };

  const proofs = [
    {
      id: Math.random().toString(),
      proof: 'førerkort-klasse-B',
    },
    {
      id: Math.random().toString(),
      proof: 'er-sykepleier',
    },
    {
      id: Math.random().toString(),
      proof: theProof,
    },
  ];

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
      <Button title="Press" onPress={() => getProof()} />
      <Menu></Menu>
    </SafeAreaView>
  );
}

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

import React, { useState } from 'react';

import { SafeAreaView, Text, FlatList, View, StyleSheet } from 'react-native';
import Menu from '../Menu';
import Knapp from '../Knapp';

import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused } from '@react-navigation/native';

export default function ProofOverviewFrame() {
  const [proofs, setProofs] = useState([]);
  const [keys, setKeys] = useState([]);

  const isFocused = useIsFocused();

  const getProof = async () => {
    try {
      for (let key = 0; key < keys.length; key++) {
        const value = await AsyncStorage.getItem(keys[key]);
        if (value !== null) {
          console.log(value);
          if (!proofs.some((item) => item.id == keys[key])) {
            proofs.push({ id: keys[key], proof: value });
          }
        }
        console.log('Proofs:', proofs);
      }
    } catch (error) {
      alert(error);
    }
  };

  const getKeys = async () => {
    try {
      const theKeys = await AsyncStorage.getAllKeys();
      console.log(theKeys);
      if (theKeys !== null) {
        for (let i = 0; i < theKeys.length; i++) {
          if (!keys.includes(theKeys[i])) {
            keys.push(theKeys[i]);
            console.log(keys);
          }
        }
      }
      console.log(keys);
      getProof();
    } catch (error) {
      alert(error);
    }
  };

  isFocused ? getKeys() && getProof() : null;

  // const proofs = [
  //   {
  //     id: Math.random().toString(),
  //     proof: 'førerkort-klasse-B',
  //   },
  //   {
  //     id: Math.random().toString(),
  //     proof: 'er-sykepleier',
  //   },
  //   {
  //     id: Math.random().toString(),
  //     proof: theProof,
  //   },
  // ];

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

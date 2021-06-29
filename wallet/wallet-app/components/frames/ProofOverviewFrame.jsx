import React from 'react';

import { SafeAreaView, Text, FlatList, View, StyleSheet, Button } from 'react-native';
import Menu from '../Menu';
import Knapp from '../Knapp';
import { useSelector, useDispatch } from 'react-redux';
import {
  addCredential,
  createCredential,
  deleteCredential,
  removeCredential,
} from '../../redux/CredentialSlice';

export default function ProofOverviewFrame() {
  /*const proofs = [
    {
      id: Math.random().toString(),
      proof: 'førerkort-klasse-B',
    },
    {
      id: Math.random().toString(),
      proof: 'er-sykepleier',
    },
  ];*/

  const { cred } = useSelector((state) => state.credentials);
  const dispatch = useDispatch(); //To call every reducer that we want

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
        data={cred}
        renderItem={({ item }) => (
          <View style={styles.theProofs}>
            <Text style={styles.textProofs}> {item.proof}</Text>
            <Knapp></Knapp>
            <Button title="Remove" onPress={() => dispatch(removeCredential(item.id))} />
          </View>
        )}
      />
      <Button title="Add" onPress={() => dispatch(addCredential())} />
      <Menu></Menu>
    </SafeAreaView>
  );
}

import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Knapp from './Knapp';
import { useNavigation } from '@react-navigation/core';

export default function Proof() {
  const navigation = useNavigation();
  const proofs = [
    {
      id: Math.random().toString(),
      proof: 'førerkort-klasse-B',
      issuer: 'Statens Vegvesen',
      issuedDate: '20.02.21',
      expiryDate: '20.02.24',
    },
    {
      id: Math.random().toString(),
      proof: 'er-sykepleier',
      issuer: 'NTNU',
      issuedDate: '20.02.21',
      expiryDate: '20.02.24',
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
    proofLog: {
      fontSize: 20,
      fontFamily: 'Helvetica',
    },
  });

  return (
    <FlatList
      keyExtractor={(item) => item.id}
      data={proofs}
      renderItem={({ item }) => (
        <View style={styles.theProofs}>
          <Text style={styles.textProofs}> {item.proof}</Text>
          <Text> Utstedt av: {item.issuer}</Text>
          <Text>
            Gyldig fra/til: {item.issuedDate}/{item.expiryDate}
          </Text>

          <TouchableOpacity style={styles.proofLog} onPress={() => navigation.navigate('Delt med')}>
            Delt med
          </TouchableOpacity>
          <Knapp />
        </View>
      )}
    />
  );
}
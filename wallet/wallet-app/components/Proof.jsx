import React, {useState} from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
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
      verifiers:  ['ei teneste', 'ei anna teneste']
    },
    {
      id: Math.random().toString(),
      proof: 'er-sykepleier',
      issuer: 'NTNU',
      issuedDate: '20.02.21',
      expiryDate: '20.02.24',
      verifiers: ['ei anna tenesteee', 'ei annaaaa teneste']
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: '12%',
    },
    theProofs: {
      backgroundColor: '#CDE8C5',
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
      borderRadius: 4,
      backgroundColor: 'rgb(242, 242, 242)',
      padding: 10,
      marginTop: 10,
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
          <TouchableOpacity style={styles.proofLog} onPress={() =>  navigation.navigate('Delt med', {item})}>
            <Text>Delt med</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}
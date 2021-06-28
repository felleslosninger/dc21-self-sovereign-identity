import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Knapp from './Knapp';
import { useNavigation } from '@react-navigation/core';

export default function Verifier() {
  const verifiers = [
    {
      id: Math.random().toString(),
      verifier: 'Ein teneste'
    },
    {
      id: Math.random().toString(),
      verifier: 'ein anna teneste'
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
      fontSize: 20,
      fontFamily: 'Helvetica',
    },
  });

  return (
    <FlatList
      keyExtractor={(item) => item.id}
      data={verifiers}
      renderItem={({ item }) => (
        <View style={styles.theProofs}>
          <Text style={styles.textProofs}> {item.verifier}</Text>
          <Knapp />
        </View>
      )}
    />
  );
}
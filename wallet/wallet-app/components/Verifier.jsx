import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Knapp from './Knapp';

export default function Verifier(props) {

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
    <View style={styles.theProofs}>
          <Text style={styles.textProofs}> {props.name}</Text>
          <Knapp />
    </View>
  );
}
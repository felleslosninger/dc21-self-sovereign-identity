import React from 'react';
import { SafeAreaView, Text, FlatList, View, StyleSheet, Button } from 'react-native';
import Menu from '../Menu';
import Knapp from '../Knapp';
import { useSelector, useDispatch } from 'react-redux';
import { addCredential, removeCredential } from '../../redux/CredentialSlice';
import { SafeAreaView, StyleSheet } from 'react-native';
import Menu from '../Menu';
import Proof from '../Proof';

export default function ProofOverviewFrame() {
  const { cred } = useSelector((state) => state.credentials);
  const dispatch = useDispatch(); //To call every reducer that we want
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: '12%',
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
            <Button
              title="Remove"
              onPress={() => {
                dispatch(removeCredential(item.id));
              }}
            />
          </View>
        )}
      />
      <Button
        title="Add"
        onPress={() =>
          dispatch(addCredential({ id: Math.floor(Math.random() * 1000), proof: 'over-18' }))
        }
      />
      <Menu></Menu>
    </SafeAreaView>
  );
}
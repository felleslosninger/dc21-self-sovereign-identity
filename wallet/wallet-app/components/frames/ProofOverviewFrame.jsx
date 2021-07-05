import React from 'react';
import { SafeAreaView, StyleSheet, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import Menu from '../Menu';
import { addCredential } from '../../redux/CredentialSlice';
import Proof from '../Proof';

export default function ProofOverviewFrame() {
  const dispatch = useDispatch(); // To call every reducer that we want

    return (
        <SafeAreaView style={styles.container}>
            <Proof />
            <Button
                title="Add"
                onPress={() =>
                    dispatch(
                        addCredential({
                            id: Math.random().toString(),
                            proof: `${`over-${Math.floor(Math.random() * 100)}`}`,
                            issuer: 'Folkeregisteret',
                            issuedDate: '20.02.21',
                            expiryDate: '20.02.24',
                            verifiers: ['ei anna tenesteee', 'ei annaaaa teneste'],
                        })
                    )
                }
            />
            <Menu />
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

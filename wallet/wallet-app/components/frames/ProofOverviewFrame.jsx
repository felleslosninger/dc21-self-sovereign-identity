import React from 'react';
import { SafeAreaView, StyleSheet, Button, TouchableOpacity, Text, View} from 'react-native';
import { useDispatch } from 'react-redux';
import { addCredential } from '../../redux/CredentialSlice';
import Proof from '../Proof';
import { signIn } from '../../redux/SignedInSlice';
import ProfileMenuSlide from './ProfileMenu';

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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: '12%',
    },
    logOut: {
        borderRadius: 4,
        backgroundColor: '#3aa797',
        padding: 10,
        marginTop: 10,
        marginBottom: 30,
        width: 75,
        alignSelf: 'flex-end',
        right: 5,
    },
});

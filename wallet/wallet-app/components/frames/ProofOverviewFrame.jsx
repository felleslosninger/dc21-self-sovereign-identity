import React, { useState } from 'react';
import { SafeAreaView, FlatList, StyleSheet, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import Menu from '../Menu';
import { addCredential } from '../../redux/CredentialSlice';
import Proof from '../Proof';

export default function ProofOverviewFrame() {
    const dispatch = useDispatch(); // To call every reducer that we want
    // const { cred } = useSelector((state) => state.credentials);

    const [proofs, setProofs] = useState([]);
    const [keys, setKeys] = useState([]);

    const isFocused = useIsFocused();

    const getProofs = async () => {
        try {
            for (let key = 0; key < keys.length; key++) {
                const value = await AsyncStorage.getItem(keys[key]);
                if (value !== null) {
                    console.log(value);
                    if (!proofs.some((item) => item.id === keys[key])) {
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
            getProofs();
        } catch (error) {
            alert(error);
        }
    };

    isFocused ? getKeys() : null;

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                keyExtractor={(item) => item.id}
                data={proofs}
                renderItem={({ item }) => <Proof id={item.id} name={item.proof} />}
            />
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

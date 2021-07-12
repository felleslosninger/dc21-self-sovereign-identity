/* eslint-disable no-unused-expressions */
/* eslint-disable no-alert */

import React, { useState } from 'react';
import { SafeAreaView, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import Proof from '../Proof';
import { signIn } from '../../redux/SignedInSlice';

export default function ProofOverviewFrame() {
    const dispatch = useDispatch(); // To call every reducer that we want
    const { cred } = useSelector((state) => state.credentials);

    const [proofs, setProofs] = useState([]);
    const [keys, setKeys] = useState([]);

    const isFocused = useIsFocused();

    const getProofs = async () => {
        try {
            for (let key = 0; key < keys.length; key++) {
                const value = await AsyncStorage.getItem(keys[key]);
                if (value !== null) {
                    if (!proofs.some((item) => item.id === keys[key])) {
                        proofs.push({ id: keys[key], proof: value });
                    }
                }
            }
        } catch (error) {
            alert(error);
        }
    };

    const getKeys = async () => {
        console.log(cred);
        try {
            const theKeys = await AsyncStorage.getAllKeys();
            if (theKeys !== null) {
                for (let i = 0; i < theKeys.length; i++) {
                    if (!keys.includes(theKeys[i])) {
                        keys.push(theKeys[i]);
                    }
                }
            }
            getProofs();
        } catch (error) {
            alert(error);
        }
    };

    isFocused ? getKeys() : null;

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.logOut} onPress={() => dispatch(signIn(false))}>
                <Text>Logg ut</Text>
            </TouchableOpacity>
            <FlatList
                keyExtractor={(item) => item.jti}
                data={cred}
                renderItem={({ item }) => (
                    <Proof id={item.jti} name={item.vc} issuer={item.iss} issDate={item.iat} expDate={item.exp} />
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: '5%',
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

/* eslint-disable no-unused-expressions */
/* eslint-disable no-alert */
import { SafeAreaView, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Text } from 'react-native-ui-lib';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NavigationActions } from 'react-navigation';
import { addCredential } from '../../redux/CredentialSlice';
import Proof from '../views/ProofView';

/**
 * A frame with an overview of every proof the wallet has
 * @returns
 */
export default function ProofOverviewFrame() {
    const dispatch = useDispatch(); // To call every reducer that we want. Using dispatch to communicate with state management
    const { cred } = useSelector((state) => state.credentials);
    const navigation = useNavigation();

    const [proofs, setProofs] = useState([]);
    const [keys, setKeys] = useState([]);

    const isFocused = useIsFocused();

    /**
     * Adds the keys and the associated information into a list
     */
    const getProofs = async () => {
        try {
            for (let key = 0; key < keys.length; key++) {
                const value = await AsyncStorage.getItem(keys[key]);
                if (value !== null) {
                    if (!proofs.some((item) => item.id === keys[key])) {
                        // Makes sure that there are no duplicates
                        proofs.push({ id: keys[key], proof: value });
                        dispatch(addCredential(JSON.parse(value)));
                    }
                }
            }
        } catch (error) {
            alert(error);
        }
    };

    /**
     * Gets all the keys in AsyncStorage, except for the pin key
     * Adds the keys into a list
     */
    const getKeys = async () => {
        try {
            const theKeys = await AsyncStorage.getAllKeys();
            if (theKeys !== null) {
                for (let i = 0; i < theKeys.length; i++) {
                    if (
                        !keys.includes(theKeys[i]) &&
                        theKeys[i] !== 'pin' &&
                        theKeys[i] !== 'baseId' &&
                        theKeys[i] !== 'privateKey' &&
                        theKeys[i] !== 'walletID'
                    ) {
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

    function getVcName(item) {
        return Object.values(item.vc.credentialSubject)[0].name;
    }

    return cred.length === 0 ? (
        <SafeAreaView style={styles.container}>
            <Text text40 color="rgb(30,46,60)" style={{ paddingVertical: 10, paddingBottom: 230 }}>
                Du har ingen bevis.
            </Text>

            <Icon
                style={{ paddingTop: 8, alignItems: 'center', justifyContent: 'center' }}
                name="plus"
                size={60}
                color="rgb(30,46,60)"
                onPress={() => navigation.navigate('Forespørsler')}
            />
            <Text
                onPress={() => navigation.navigate('Forespørsler')}
                text90
                color="rgb(30,46,60)"
                style={{ paddingVertical: 10 }}>
                Legg til bevis
            </Text>
        </SafeAreaView>
    ) : (
        <SafeAreaView>
            <FlatList
                marginTop={25}
                keyExtractor={(item) => item.jti}
                data={cred}
                renderItem={({ item }) => (
                    <Proof
                        id={item.jti}
                        name={getVcName(item)}
                        // fix issuer display / handle issuerid
                        issuer={item.iss.substring(0, item.iss.length - 36)}
                        issDate={item.iat}
                        expDate={item.exp}
                    />
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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
        backgroundColor: 'rgb(0,98,184)',
        padding: 10,
        marginTop: 10,
        marginBottom: 30,
        width: 75,
        alignSelf: 'flex-end',
        right: 5,
    },
    container: {
        width: '80%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 80,
    },
});

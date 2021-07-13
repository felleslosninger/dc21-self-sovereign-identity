import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { removeCredential } from '../redux/CredentialSlice';

/**
 * A proof object/card with info about the issuer, validity, shared with and deletion option.
 * @param {string} props 
 * From the ProofOverviewFrame a proof object is sent with corresponding prop values.
 * @returns A proof card/object
 */
export default function Proof(props) {
    const navigation = useNavigation();
    const { cred } = useSelector((state) => state.credentials);

    const dispatch = useDispatch(); // To call every reducer that we want

/**
 * Removes the item for the given key from the async storage and state (in CredentialSlice)
 * @param {string} key 
 * key is ID (a prop) to a proof
 * @returns true/false depending on whether proof was removed or not.
 */
    async function removeItemValue(key) {
        dispatch(removeCredential(key)); //removes proof from redux
        try {
            await AsyncStorage.removeItem(key); //removes proof from AsyncStorage
            return true;
        } catch (exception) {
            return false;
        }
    }

    return (
        <View style={styles.theProofs}>
            <Text style={styles.textProofs}> {props.name}</Text>
            <Text> Utstedt av: {props.issuer}</Text>
            <Text>
                Gyldig fra/til: {new Date(props.issDate).toLocaleString()}/{new Date(props.expDate).toLocaleString()}
            </Text>
            <TouchableOpacity style={styles.proofLog} onPress={() => navigation.navigate('Delt med', { props })}>
                <Text>Delt med</Text>
            </TouchableOpacity>
            <Button
                title="Fjern bevis"
                onPress={() => {
                    // dispatch(removeCredential(props.id));
                    removeItemValue(props.id);
                }}
            />
        </View>
    );
}

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

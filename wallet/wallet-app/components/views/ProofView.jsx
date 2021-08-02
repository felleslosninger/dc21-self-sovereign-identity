/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card, Text } from 'react-native-ui-lib';
import { removeCredential } from '../../redux/CredentialSlice';

/**
 * A proof object/card with info about the issuer, validity, shared with and deletion option.
 * @param {string} props
 * From the ProofOverviewFrame a proof object is sent with corresponding prop values.
 * @returns A proof card/object
 */
export default function Proof(props) {
    const navigation = useNavigation();
    // const { cred } = useSelector((state) => state.credentials);

    const dispatch = useDispatch(); // To call every reducer that we want

    /**
     * Removes the item for the given key from the async storage and state (in CredentialSlice)
     * @param {string} key
     * key is ID (a prop) to a proof
     * @returns true/false depending on whether proof was removed or not.
     */
    async function removeItemValue(key) {
        dispatch(removeCredential(key)); // removes proof from redux
        try {
            await AsyncStorage.removeItem(key); // removes proof from AsyncStorage
            return true;
        } catch (exception) {
            return false;
        }
    }

    return (
        <Card
            style={{ marginHorizontal: 25, marginVertical: 5 }}
            onPress={() => navigation.navigate('Delt med', { props })}>
            <Card.Section
                content={[
                    { text: props.name, text50: true, grey10: true },
                    { text: `Utstedt av: ${props.issuer}`, text100: true, grey40: true },
                    {
                        text: `Gyldighet: ${new Date(props.issDate * 1000).toLocaleDateString()} - ${new Date(
                            props.expDate * 1000
                        ).toLocaleDateString()}`,
                        text100: true,
                        grey40: true,
                    },
                ]}
                style={{ padding: 30 }}
            />

            {/*

            <Button
                title="Fjern bevis"
                onPress={() => {
                    // dispatch(removeCredential(props.id));
                    removeItemValue(props.id);
                }}
            />
            */}
        </Card>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: '12%',
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

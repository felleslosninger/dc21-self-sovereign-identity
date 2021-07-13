import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { exampleToken, httpGetCredential } from '../../utils/httpRequests';
import { addCredential } from '../../redux/CredentialSlice';

export default function RequestFrame() {
    const [selectedIssuer, setSelectedIssuer] = useState('NTNU');
    const [credential, setCredential] = useState('Ingen bevis hentet.');
    const [statement, setStatement] = useState('');

    const dispatch = useDispatch();

    async function retrieveCredential() {
        // const token = await httpGetCredential(statement);
        const token = exampleToken;
        const decode = await jwt_decode(exampleToken);
        const retrievedCredential = await { ...decode, token };
        setCredential(retrievedCredential);
        dispatch(addCredential(retrievedCredential));
        console.log(credential);
        console.log(decode.exp);
        await saveProof(retrievedCredential);
    }

    const saveProof = async (cred) => {
        if (statement && cred.jti !== undefined) {
            try {
                await AsyncStorage.setItem(cred.jti, JSON.stringify(cred));
            } catch (error) {
                alert(error);
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Forespørsel om nytt bevis </Text>

            <SafeAreaView style={styles.issuer}>
                <Text style={styles.text}>Velg utsteder </Text>

                <Picker selectedValue={selectedIssuer} onValueChange={(itemValue) => setSelectedIssuer(itemValue)}>
                    <Picker.Item label="NTNU" value="NTNU" />
                    <Picker.Item label="Statens Vegvesen" value="Statens Vegvesen" />
                    <Picker.Item label="Folkeregisteret" value="Folkeregisteret" />
                </Picker>
            </SafeAreaView>

            <SafeAreaView style={styles.proof}>
                <Text style={styles.text}>Ønsket bevis</Text>
                <TextInput style={styles.input} onChangeText={setStatement} value={statement} placeholder="Bevis" />
            </SafeAreaView>

            <TouchableOpacity onPress={() => retrieveCredential()}>
                <SafeAreaView style={styles.button}>
                    <Text style={styles.buttonText}>Send forespørsel</Text>
                </SafeAreaView>
            </TouchableOpacity>
            <SafeAreaView style={styles.credential}>
                <Text style={styles.buttonText}>{credential.vc}</Text>
            </SafeAreaView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: '18%',
        width: '80%',
        alignSelf: 'center',
    },
    title: {
        fontSize: 30,
        alignSelf: 'center',
        marginBottom: 13,
    },
    issuer: {
        marginTop: '1%',
    },
    text: {
        fontSize: 25,
        paddingBottom: '1%',
    },
    input: {
        borderColor: '#add8e6',
        borderWidth: 2,
        borderRadius: 5,
        padding: 7,
    },
    proof: {
        marginTop: '3%',
    },
    button: {
        marginTop: '5%',
        backgroundColor: '#add8e6',
        borderRadius: 5,
        paddingTop: '2%',
        paddingBottom: '2%',
        width: '80%',
        alignSelf: 'center',
    },
    buttonText: {
        fontSize: 20,
        alignSelf: 'center',
    },
    credential: {
        alignSelf: 'center',
        marginTop: '5%',
    },
});

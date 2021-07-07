import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import JWT from 'jsonwebtoken';
// eslint-disable-next-line no-unused-vars
import { exampleToken, httpGetCredential } from '../../utils/httpRequests';
import { addCredential } from '../../redux/CredentialSlice';

export default function RequestFrame() {
    const [selectedIssuer, setSelectedIssuer] = useState('NTNU');
    const [credential, setCredential] = useState('Ingen bevis hentet.');
    const [statement, setStatement] = useState('');

    const { cred } = useSelector((state) => state.credentials);

    const dispatch = useDispatch();

    async function retrieveCredential() {
        // const token = await httpGetCredential(statement);
        const token = exampleToken;
        console.log(token)
        const decode = jwt_decode(exampleToken);
        console.log(decode)
        const retrievedCredential = { ...decode, token };
        console.log(retrievedCredential)
        dispatch(addCredential(retrievedCredential));
        console.log(cred)
        setCredential(retrievedCredential);
        saveProof();
    }

    const saveProof = async () => {
        if (statement && !(credential === 'Ingen bevis hentet.')) {
            try {
                await AsyncStorage.setItem(credential, `${statement}|${selectedIssuer}|${credential}|${credential}`);
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

                <Picker
                    selectedValue={selectedIssuer}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSelectedIssuer(itemValue)}>
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
        picker: {
            padding: 7,
            borderWidth: 2,
            borderRadius: 5,
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

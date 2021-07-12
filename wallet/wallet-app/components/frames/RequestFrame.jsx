import React, { useState } from 'react';

import { SafeAreaView, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
// import JWT from 'jsonwebtoken';
// eslint-disable-next-line no-unused-vars
import { exampleCredentialToken, httpGetCredential } from '../../utils/httpRequests';
import { addCredential } from '../../redux/CredentialSlice';

export default function RequestFrame() {
    const [selectedIssuer, setSelectedIssuer] = useState('sv');
    const [credential, setCredential] = useState('Ingen bevis hentet.');
    const [statement, setStatement] = useState(null);

    const dispatch = useDispatch();

    async function retrieveCredential() {
        // const token = await httpGetCredential(statement);
        const token = exampleCredentialToken;
        const decode = jwtDecode(token);
        const retrievedCredential = { ...decode, token };
        console.log(retrievedCredential);
        dispatch(addCredential(retrievedCredential));
        setCredential(retrievedCredential);
        // saveProof(); STORAGE
    }

    /*
    const saveProof = async () => {
      if (statement) {
        try {
          await AsyncStorage.setItem(Math.random().toString(36).substring(2), statement);
        } catch (error) {
          alert(error);
        }
      }
    };
    */

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Forespørsel om nytt bevis </Text>

            <SafeAreaView style={styles.issuer}>
                <Text style={styles.text}>Velg utsteder </Text>

                <Picker
                    selectedValue={selectedIssuer}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSelectedIssuer(itemValue)}>
                    <Picker.Item label="NTNU" value="ntnu" />
                    <Picker.Item label="Statens Vegvesen" value="sv" />
                    <Picker.Item label="Folkeregisteret" value="fr" />
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
            <SafeAreaView>
                <Text>{credential.vc}</Text>
            </SafeAreaView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: '18%',
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
        marginLeft: 30,
    },
    picker: {
        width: '80%',
        alignSelf: 'center',
    },
    input: {
        borderColor: '#add8e6',
        borderWidth: 2,
        borderRadius: 2,
        width: '80%',
        alignSelf: 'center',
    },
    proof: {
        marginTop: '3%',
    },
    button: {
        marginTop: '5%',
        backgroundColor: '#add8e6',
        alignItems: 'center',
        borderRadius: 5,
        width: '80%',
        alignSelf: 'center',
    },
    buttonText: {
        fontSize: 20,
    },
});

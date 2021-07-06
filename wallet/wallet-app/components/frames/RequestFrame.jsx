import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { httpGetCredential } from '../../utils/httpRequests';
import Menu from '../Menu';

export default function RequestFrame() {
    const [selectedIssuer, setSelectedIssuer] = useState('NTNU');
    const [credential, setCredential] = useState('Ingen bevis hentet.');
    const [statement, setStatement] = useState(null);

    async function sendCredentialRequest() {
        // let url = 'http://localhost:8083/api/getCredential/';
        // let statement = 'Gyldig førerkort klasse B.';
        saveProof();
        const verifiedStatement = await httpGetCredential(statement);
        setCredential(verifiedStatement);
    }

    const saveProof = async () => {
        if (statement) {
            try {
                console.log(selectedIssuer);
                const ID = Math.random().toString(36).substring(2);
                const date = new Date().getDate();
                const month = new Date().getMonth() + 1;
                const year = new Date().getFullYear();
                const issDate = `${date}-${month}-${year}`;
                const expYear = year + 1;
                const expDate = `${date}-${month}-${expYear}`;
                await AsyncStorage.setItem(ID, `${statement}|${selectedIssuer}|${issDate}|${expDate}`);
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

            <TouchableOpacity onPress={sendCredentialRequest}>
                <SafeAreaView style={styles.button}>
                    <Text style={styles.buttonText}>Send forespørsel</Text>
                </SafeAreaView>
            </TouchableOpacity>

            <SafeAreaView style={styles.credential}>
                <Text style={styles.buttonText}>{credential}</Text>
            </SafeAreaView>

            <Menu />
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

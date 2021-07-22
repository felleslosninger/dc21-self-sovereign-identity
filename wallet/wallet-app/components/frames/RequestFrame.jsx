import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
// import JWT from 'jsonwebtoken';
// eslint-disable-next-line no-unused-vars
import AsyncStorage from '@react-native-async-storage/async-storage';
import { exampleBaseVc, httpGetCredential } from '../../utils/httpRequests';
import { addCredential } from '../../redux/CredentialSlice';

/**
 * Page to request new proof, retrieve and save new proof
 * @returns Buttons and menus to select the issuer and type of proof
 */
export default function RequestFrame() {
    const [selectedIssuer, setSelectedIssuer] = useState('NTNU');
    const [feedback, setFeedback] = useState('');
    const [vcType, setVcType] = useState('');
    const dispatch = useDispatch();

    /**
     * Retrieves proof and saves it
     */
    async function retrieveCredential() {
        const response = await httpGetCredential(vcType, exampleBaseVc);
        try {
            const decode = jwtDecode(response);
            const retrievedCredential = { ...decode, token: response, type: vcType };
            dispatch(addCredential(retrievedCredential));
            setFeedback(`hentet ${vcType} bevis`);
            // await saveProof(retrievedCredential);
        } catch (error) {
            setFeedback(response);
        }
    }

    const saveProof = async (cred) => {
        if (vcType && cred.jti !== undefined) {
            try {
                await AsyncStorage.setItem(cred.jti, JSON.stringify(cred));
            } catch (error) {
                alert(error);
            }
        }
    };

    const issuers = [
        { name: 'NTNU' },
        { name: 'Statens Vegvesen' },
        { name: 'Folkeregisteret' },
        { name: 'UtsederAvBevis.no' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Forespørsel om nytt bevis </Text>

            <SafeAreaView style={styles.issuer}>
                <Text style={styles.text}>Velg utsteder </Text>

                <Picker selectedValue={selectedIssuer} onValueChange={(itemValue) => setSelectedIssuer(itemValue)}>
                    {issuers.map((i) => (
                        <Picker.Item key={i.name} label={i.name} value={i.name} />
                    ))}
                </Picker>
            </SafeAreaView>

            <SafeAreaView style={styles.proof}>
                <Text style={styles.text}>Ønsket bevis</Text>

                <TextInput style={styles.input} onChangeText={setVcType} value={vcType} placeholder="Bevis" />
            </SafeAreaView>

            <TouchableOpacity onPress={() => retrieveCredential()}>
                <SafeAreaView style={styles.button}>
                    <Text style={styles.buttonText}>Send forespørsel</Text>
                </SafeAreaView>
            </TouchableOpacity>
            <SafeAreaView style={styles.credential}>
                <Text style={styles.buttonText}>{feedback}</Text>
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

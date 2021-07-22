import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
// import JWT from 'jsonwebtoken';
// eslint-disable-next-line no-unused-vars
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { httpGetCredential, httpGetTypesFromIssuer } from '../../utils/httpRequests';
import { addCredential } from '../../redux/CredentialSlice';

/**
 * Page to request new proof, retrieve and save new proof
 * @returns Buttons and menus to select the issuer and type of proof
 */
export default function RequestFrame() {
    const [selectedIssuer, setSelectedIssuer] = useState('');
    const [feedback, setFeedback] = useState('');
    const [vcType, setVcType] = useState('');
    const dispatch = useDispatch();
    const [issuerTypes, setIssuerTypes] = useState([]);

    async function issuerChanged(itemValue) {
        setSelectedIssuer(itemValue);
        setIssuerTypes(JSON.parse(await httpGetTypesFromIssuer(itemValue)));
        console.log(typeof issuerTypes);
    }

    function typeChanged(type) {
        setVcType(type);
    }

    // issuerChanged('ntnu');

    /**
     * Retrieves proof and saves it
     */
    async function retrieveCredential() {
        console.log(vcType);
        const baseVC = await AsyncStorage.getItem('baseId');

        const response = await httpGetCredential(vcType, baseVC);
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
        { name: 'ntnu' },
        { name: 'statensvegvesen' },
        { name: 'folkeregisteret' },
        // { name: 'UtsederAvBevis.no' },
    ];

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Forespørsel om nytt bevis </Text>

            <SafeAreaView style={styles.issuer}>
                <Text style={styles.text}>Velg utsteder </Text>

                <Picker selectedValue={selectedIssuer} onValueChange={(itemValue) => issuerChanged(itemValue)}>
                    <Picker.Item label="Velg utsteder..." value="" />
                    {issuers.map((i) => (
                        <Picker.Item label={i.name} value={i.name} />
                    ))}
                </Picker>
            </SafeAreaView>

            <SafeAreaView style={styles.issuer}>
                <Text style={styles.text}>Velg bevis </Text>

                <Picker selectedValue={vcType} onValueChange={(itemValue) => typeChanged(itemValue)}>
                    <Picker.Item label="Velg bevis..." value="" />
                    {issuerTypes.map((i) => (
                        <Picker.Item label={i} value={i} />
                    ))}
                </Picker>
            </SafeAreaView>

            {/*   <SafeAreaView style={styles.proof}>
                <Text style={styles.text}>Ønsket bevis</Text>

                <TextInput style={styles.input} onChangeText={setVcType} value={vcType} placeholder="Bevis" />
            </SafeAreaView> */}

            <TouchableOpacity onPress={() => retrieveCredential()}>
                <SafeAreaView style={styles.button}>
                    <Text style={styles.buttonText}>Send forespørsel</Text>
                </SafeAreaView>
            </TouchableOpacity>
            <SafeAreaView style={styles.credential}>
                <Text style={styles.buttonText}>{feedback}</Text>
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: '18%',
        alignSelf: 'center',
    },
    title: {
        fontSize: 32,
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
        borderColor: '#3aa797',
        borderWidth: 2,
        borderRadius: 5,
        padding: 7,
    },
    proof: {
        marginTop: '3%',
    },
    button: {
        marginTop: '5%',
        backgroundColor: '#3aa797',
        borderRadius: 5,
        height: 40,
        width: '80%',
        alignSelf: 'center',
    },
    buttonText: {
        fontSize: 22,
        marginTop: 7,
        alignSelf: 'center',
    },
    credential: {
        alignSelf: 'center',
        marginTop: '5%',
    },
});

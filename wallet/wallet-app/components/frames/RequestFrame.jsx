import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
// import JWT from 'jsonwebtoken';
// eslint-disable-next-line no-unused-vars
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, Colors, Picker } from 'react-native-ui-lib';
import { httpGetAllIssuers, httpGetCredential, httpGetTypesFromIssuer } from '../../utils/httpRequests';
import { addCredential } from '../../redux/CredentialSlice';

/**
 * Page to request new proof, retrieve and save new proof
 * @returns Buttons and menus to select the issuer and type of proof
 */
export default function RequestFrame() {
    const dispatch = useDispatch();

    const [selectedIssuer, setSelectedIssuer] = useState('');
    const [feedback, setFeedback] = useState('');
    const [vcType, setVcType] = useState('');
    const [issuerTypes, setIssuerTypes] = useState([]);
    const [availableIssuers, setAvailableIssuers] = useState([]);

    async function issuerChanged(itemValue) {
        alert(`${itemValue}itemvalue`);
        setSelectedIssuer(itemValue);
        const typesString = await httpGetTypesFromIssuer(itemValue);
        alert(typesString);
        setIssuerTypes(JSON.parse(typesString));
    }

    async function getAllIssuers() {
        setAvailableIssuers(JSON.parse(await httpGetAllIssuers()));
    }
    getAllIssuers();
    // console.log(availableIssuers);
    // issuerChanged('ntnu');

    /**
     * Retrieves proof
     */
    async function retrieveCredential() {
        const baseVC = await AsyncStorage.getItem('baseId');

        const response = await httpGetCredential(vcType, baseVC, selectedIssuer);
        try {
            const decode = jwtDecode(response);
            const retrievedCredential = { ...decode, token: response, type: vcType };
            dispatch(addCredential(retrievedCredential));
            if (selectedIssuer === decode.iss.substring(0, decode.iss.length - 36)) {
                setFeedback(`hentet ${vcType} bevis`);
            } else {
                setFeedback('Utsteder stemmer ikke med det du har etterspurt. Prøv igjen.');
            }

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

    /* const issuers = [
        { name: 'ntnu' },
        { name: 'statensvegvesen' },
        { name: 'folkeregisteret' },
        // { name: 'UtsederAvBevis.no' },
    ]; */

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Forespørsel om nytt bevis </Text>

            <SafeAreaView>
                <Picker
                    placeholder="Velg utsteder"
                    floatingPlaceholder
                    value={selectedIssuer}
                    enableModalBlur={false}
                    onChange={(item) => issuerChanged(item)}
                    topBarProps={{ title: 'Utstedere' }}
                    showSearch
                    searchPlaceholder="Søk etter utsteder"
                    searchStyle={{ color: 'rgb(0,98,184)', placeholderTextColor: Colors.dark50 }}
                    // onSearchChange={value => console.warn('value', value)}
                >
                    {availableIssuers.map((i) => (
                        <Picker.Item key={i.name} label={i.name} value={i.name} />
                    ))}
                </Picker>
            </SafeAreaView>
            {issuerTypes ? (
                <SafeAreaView style={styles.issuer}>
                    <Picker
                        placeholder="Velg type bevis"
                        floatingPlaceholder
                        value={vcType}
                        enableModalBlur={false}
                        onChange={(item) => setVcType(item)}
                        topBarProps={{ title: 'Type bevis' }}
                        showSearch
                        searchPlaceholder="Søk etter bevis"
                        searchStyle={{ color: 'rgb(0,98,184)', placeholderTextColor: Colors.dark50 }}
                        // onSearchChange={value => console.warn('value', value)}
                    >
                        {issuerTypes.map((type) => (
                            <Picker.Item key={type.name} label={type.name} value={type.name} />
                        ))}
                    </Picker>
                </SafeAreaView>
            ) : null}

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
    text: {
        fontSize: 25,
        paddingBottom: '1%',
    },
    input: {
        borderColor: 'rgb(0,98,184)',
        borderWidth: 2,
        borderRadius: 5,
        padding: 7,
    },
    proof: {
        marginTop: '3%',
    },
    button: {
        marginTop: '5%',
        backgroundColor: 'rgb(0,98,184)',
        borderRadius: 5,
        height: 40,
        width: '80%',
        alignSelf: 'center',
    },
    buttonText: {
        fontSize: 22,
        marginTop: 7,
        alignSelf: 'center',
        color: 'white',
    },
    credential: {
        alignSelf: 'center',
        marginTop: '5%',
    },
});

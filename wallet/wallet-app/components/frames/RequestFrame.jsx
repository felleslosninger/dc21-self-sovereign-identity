/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
// eslint-disable-next-line no-unused-vars
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, Colors, Picker, LoaderScreen } from 'react-native-ui-lib';
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

    const [loading, setLoading] = useState(false);

    async function getAllIssuers() {
        setAvailableIssuers(JSON.parse(await httpGetAllIssuers()));
    }

    getAllIssuers();

    useEffect(() => {
        async function fetchTypes() {
            const types = JSON.parse(await httpGetTypesFromIssuer(selectedIssuer));
            setIssuerTypes(types);
        }
        fetchTypes();
    }, [selectedIssuer]);

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

    return loading ? (
        <LoaderScreen color={Colors.blue30} message="Loading..." overlay />
    ) : (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Forespørsel om nytt bevis </Text>

            <SafeAreaView>
                <Picker
                    placeholder="Velg utsteder"
                    floatingPlaceholder
                    value={selectedIssuer}
                    enableModalBlur={false}
                    onChange={(item) => setSelectedIssuer(item.value)}
                    topBarProps={{ title: 'Utstedere' }}
                    showSearch
                    searchPlaceholder="Søk etter utsteder"
                    searchStyle={{ color: 'rgb(0,98,184)', placeholderTextColor: Colors.dark50 }}
                    // onSearchChange={value => console.warn('value', value)}
                >
                    {availableIssuers.map((i) => (
                        <Picker.Item key={i} label={i} value={i} />
                    ))}
                </Picker>
            </SafeAreaView>
            {selectedIssuer ? (
                <SafeAreaView style={styles.issuer}>
                    <Picker
                        placeholder="Velg type bevis"
                        floatingPlaceholder
                        value={vcType}
                        enableModalBlur={false}
                        onChange={(item) => setVcType(item.value)}
                        topBarProps={{ title: 'Type bevis' }}
                        showSearch
                        searchPlaceholder="Søk etter bevis"
                        searchStyle={{ color: 'rgb(0,98,184)', placeholderTextColor: Colors.dark50 }}
                        // onSearchChange={value => console.warn('value', value)}
                    >
                        {issuerTypes.length > 0
                            ? issuerTypes.map((i) => <Picker.Item key={i} label={i} value={i} />)
                            : null}
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

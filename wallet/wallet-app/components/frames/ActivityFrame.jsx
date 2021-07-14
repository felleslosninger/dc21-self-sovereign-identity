import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { useSelector } from 'react-redux';
import { httpSendCredential } from '../../utils/httpRequests';

/**
 * A frame with a botton to send proof to a verifier if you choose to share
 * @returns A frame, sending the proof
 */
export default function ActivityFrame() {
    const [status, setStatus] = useState(false);

    const [credential, setCredential] = useState({
        sub: 'testSub',
        iss: 'NTNU',
        exp: 1718445600,
        iat: 1623751200,
        vc: 'er-sykepleier',
        jti: 'randomID-sykepleier',
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0U3ViIiwiaXNzIjoiTlROVSIsImV4cCI6MTcxODQ0NTYwMCwiaWF0IjoxNjIzNzUxMjAwLCJ2YyI6ImVyLXN5a2VwbGVpZXIiLCJqdGkiOiJyYW5kb21JRC1zeWtlcGxlaWVyIn0.Yieg4SAjR2rzFaQf8I77f6qOlRnCTxbMCa93k5t0tNo',
    });
    // const { cred } = useSelector((state) => state.credentials);

    async function sendCredential() {
        const verified = await httpSendCredential(credential.token);
        setStatus(verified);
        return verified;
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={sendCredential}>
                <SafeAreaView style={styles.sendButton}>
                    <Text style={styles.buttonText}>Send bevis {credential.vc} til tjeneste X</Text>
                </SafeAreaView>
            </TouchableOpacity>
            <SafeAreaView styles={styles.sharedProofText}>
                <Text style={styles.buttonText}>Du har {status ? 'nå' : 'ikke'} delt beviset</Text>
            </SafeAreaView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: '10%',
        width: '80%',
        alignSelf: 'center',
    },
    sendButton: {
        backgroundColor: '#CDE8C5',
        borderRadius: 5,
        paddingTop: '2%',
        paddingBottom: '2%',
        width: '80%',
        alignSelf: 'center',
        padding: '2%',
    },
    buttonText: {
        fontSize: 20,
        alignSelf: 'center',
    },
    sharedProofText: {
        alignSelf: 'center',
    },
});

// onPress={() => dispatch(signIn(false))

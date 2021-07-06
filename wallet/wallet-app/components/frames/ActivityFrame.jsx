import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { httpSendCredential } from '../../utils/httpRequests';
import Menu from '../Menu';

export default function ActivityFrame() {
    const [toggle, setToggle] = useState(false);

    async function sendCredential() {
        console.log('Sender credential');
        const status = await httpSendCredential('123');
        console.log(status);
        setToggle(status);
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={sendCredential}>
                <SafeAreaView style={styles.sendButton}>
                    <Text style={styles.buttonText}>Send bevis til tjeneste X</Text>
                </SafeAreaView>
            </TouchableOpacity>
            <SafeAreaView styles={styles.sharedProofText}>
                <Text style={styles.buttonText}>Du har {toggle ? 'nå' : 'ikke'} delt beviset</Text>
            </SafeAreaView>
            <Menu />
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
    },
    buttonText: {
        fontSize: 20,
        alignSelf: 'center',
    },
    sharedProofText: {
        alignSelf: 'center',
        marginTop: '5%',
    },
});

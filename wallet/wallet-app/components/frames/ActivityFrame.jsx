import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { useSelector } from 'react-redux';
import { exampleToken, httpSendCredential } from '../../utils/httpRequests';
import Menu from '../Menu';

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
            <View>
                <Button
                    title={`Send bevis ${credential.vc} til tjeneste X`}
                    color="#f1940f"
                    onPress={() => sendCredential()}
                />
            </View>
            <Text>Du har {status ? 'nå' : 'ikke'} delt beviset</Text>
            <Menu />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: '10%',
    },
});

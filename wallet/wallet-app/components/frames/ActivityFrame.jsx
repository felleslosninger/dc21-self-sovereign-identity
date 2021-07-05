import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
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
            <View>
                <Button title="Send bevis til tjeneste X" color="#f1940f" onPress={sendCredential} />
            </View>
            <Text>Du har {toggle ? 'nå' : 'ikke'} delt beviset</Text>
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

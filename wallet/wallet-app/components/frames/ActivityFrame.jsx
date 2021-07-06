import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
// import { useDispatch } from 'react-redux';
import { httpSendCredential } from '../../utils/httpRequests';
// import { signIn } from '../../redux/SignedInSlice';

export default function ActivityFrame() {
    const [toggle, setToggle] = useState(false);
    // const dispatch = useDispatch();

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

// onPress={() => dispatch(signIn(false))

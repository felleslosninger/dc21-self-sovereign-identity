/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native'; // TextInput, TouchableOpacity

import QRCode from 'react-native-qrcode-svg';

// QRkode som tar inn informasjonen som skal ligge i koden (jwt)
export default function CreateQR(props) {
    const [qrvalue] = useState(props.content); // content=en string med informasjon(jwt) eller nettadresse
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <QRCode
                    value={qrvalue || 'NA'} // informasjon som skal inn i QRkoden
                    size={250}
                    color="#1e2b3c"
                    backgroundColor="white"
                    // eslint-disable-next-line global-require
                    logo={require('../assets/digdir-logo.jpg')} // digdirlogo i midten
                    logoSize={50} // 32 funker bra
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 10,
    },
});

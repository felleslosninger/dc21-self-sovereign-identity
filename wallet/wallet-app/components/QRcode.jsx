// Generation of QR Code in React Native
// https://aboutreact.com/generation-of-qr-code-in-react-native/

import React, { useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native'; // TextInput, TouchableOpacity

import QRCode from 'react-native-qrcode-svg';

export default function CreateQR() {
    // const [inputText, setInputText] = useState('');
    const [qrvalue] = useState('https://www.digdir.no/'); // setQrvalue

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.titleStyle}>Generation of QR Code in React Native</Text>
                <QRCode
                    // QR code value
                    value={qrvalue || 'NA'}
                    // size of QR Code
                    size={250}
                    // Color of the QR Code (Optional)
                    color="#1e2b3c"
                    // Background Color of the QR Code (Optional)
                    backgroundColor="white"
                    // Logo of in the center of QR Code (Optional)
                    // logo={{
                    // url: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/logosmalltransparen.png'", }}
                    logo={require('../assets/digdir-logo.jpg')}
                    // Center Logo size  (Optional)S
                    logoSize={50} // 32 funker bra
                    // Center Logo margin (Optional)
                    // logoMargin={2}
                    // Center Logo radius (Optional)
                    // logoBorderRadius={15}
                    // Center Logo background (Optional)
                    // logoBackgroundColor="#c2132c" // "red"
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
    titleStyle: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    textStyle: {
        textAlign: 'center',
        margin: 10,
    },
    textInputStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    buttonStyle: {
        backgroundColor: '#51D8C7',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#51D8C7',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 30,
        padding: 10,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
});

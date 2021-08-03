import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, Button, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native-ui-lib';
import SafeAreaView from 'react-native-safe-area-view';

import Icon from 'react-native-vector-icons/FontAwesome';
import { generateKeys } from '../../utils/sign';
import Access from './Access';

export async function skipOnboarding() {
    const exampleBaseVc =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIwODA4OTQwODA4NCIsImlzcyI6IkdydW5uSUQtcG9ydGFsZW4ubm85NDAxNWViYi0yMzBjLTQyMWQtOWMwZC1mNDE2NjEzNzQwNzgiLCJleHAiOjE2Mjc5MDU1MzMsImlhdCI6MTYyNjY5NTkzMywidmMiOnsiY3JlZGVudGlhbFN1YmplY3QiOnsiYmFzZWlkIjp7Im5hbWUiOiJCYXNlSUQiLCJ0eXBlIjoiQmFzZUlEIn19LCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiQmFzZUNyZWRlbnRpYWwiXSwiQGNvbnRleHQiOlsiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvdjEiXX0sImp0aSI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4My9jcmVkZW50aWFscy8xIn0.hNGmIyFzRIRm0dM0QX94umAt9egcN0mZ7zwVifAxsfMe7n4KQG5mtTRF7eDSecUicov24lskL09LhEDHGNY9EThjVOfh3cKoZd5g78qdARgpWnaXeFRDZ8Nx7mqUeKq1O4yiMcgc81pQJrH09lFfp-5PIj4KYSDLJxNFIuAOSonNpaiIHEJrwpqziWZhci15MBg7Zyu7xgD4-NWw6uc6lwDavCQ_CGB8tO2j-rMZuxHlwvjxgBVyXKTayPnPAUyiBE6xERt4NH9zTCMhSNua4nPlq4FqwFzbUEYpFbkw-UvJGSb7o0FhJqt0RP0Zdrv5Hs95tC0KP0-trNtViO7NAg';
    await AsyncStorage.setItem('pin', '1111');
    await AsyncStorage.setItem('baseId', exampleBaseVc);
    await generateKeys();
}

export default function Onboarding() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [verified, setVerified] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = async ({ type, data }) => {
        setScanned(true);
        // alert(`Bar code with type ${type} and data ${data} has been scanned!`);

        const baseId = jwtDecode(data);
        const types = baseId.vc.type;

        if (types.includes('BaseCredential')) {
            await AsyncStorage.setItem('baseId', data);
            generateKeys();
            setVerified(true);
        }
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        skipOnboarding();
        return <Access />;
    }

    return (
        <SafeAreaView style={styles.container}>
            {!scanned ? (
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'nowrap',
                        marginTop: 25,
                    }}>
                    <Icon name="question-circle" size={25} color="rgb(30,46,60)" />
                    <Text text60 style={{ marginLeft: 10 }}>
                        Skann din QR-kode fra ID-porten
                    </Text>
                </View>
            ) : null}
            {!scanned && !verified ? (
                <View style={styles.camera}>
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={StyleSheet.absoluteFillObject}
                    />
                    {scanned && <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />}
                </View>
            ) : null}

            {scanned && verified ? (
                <View style={styles.done}>
                    <Text style={styles.verifiedText}>
                        Grunnidentitet verifisert
                        <Icon name="check" size={25} color="rgb(0,98,184)" />
                    </Text>

                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Adgangskontroll')}>
                        <Text style={styles.text}>Fortsett registrering</Text>
                    </TouchableOpacity>
                </View>
            ) : null}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    camera: {
        flex: 1,
        marginTop: 30,
        marginBottom: 50,
        alignItems: 'center',
    },
    container: {
        flex: 1,
        width: '80%',
        alignSelf: 'center',
    },
    button: {
        borderRadius: 4,
        backgroundColor: 'rgb(0,98,184)',
        padding: 20,
        width: '75%',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 350,
    },
    text: {
        fontSize: 25,
        alignSelf: 'center',
        marginTop: 10,
    },
    done: {
        flex: 1,
    },
    verifiedText: {
        fontSize: 25,
        alignSelf: 'center',
        marginTop: 100,
    },
    instructionText: {
        fontSize: 20,
        alignSelf: 'flex-start',
    },
});

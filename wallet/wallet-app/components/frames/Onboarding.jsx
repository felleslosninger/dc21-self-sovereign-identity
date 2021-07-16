import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { signIn } from '../../redux/SignedInSlice';

export default function App() {
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
            setVerified(true);
        }
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
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
                        <Icon name="check" size={25} color="#3aa797" />
                    </Text>

                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Adgangskontroll')}>
                        <Text style={styles.text}>Fortsett registrering</Text>
                    </TouchableOpacity>
                </View>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    camera: {
        flex: 1,
        marginTop: 80,
        marginBottom: 80,
        alignItems: 'center',
    },
    container: {
        flex: 1,
    },
    button: {
        borderRadius: 4,
        backgroundColor: '#3aa797',
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
});

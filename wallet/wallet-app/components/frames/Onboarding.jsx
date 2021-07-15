import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { addCredential } from '../../redux/CredentialSlice';

export default function App() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [verified, setVerified] = useState(false);
    const dispatch = useDispatch();
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

        // const retrievedCredential = { ...decode, data, type: 'Grunn-id' };
        const retrievedCredential = { ...baseId, type: 'Grunn-id' };

        // If checkVerified => setVerified(true)
        if (types.includes('BaseCredential')) {
            setVerified(true);
        }

        dispatch(addCredential(retrievedCredential));
        await AsyncStorage.setItem('Grunn-id', JSON.stringify(retrievedCredential));

        // alert(JSON.stringify(retrievedCredential));
        // console.log(retrievedCredential);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.camera}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
                {scanned && <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />}
            </View>
            {scanned && verified ? (
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Adgangskontroll')}>
                    <Text style={styles.text}>Lagre grunnidentitet</Text>
                </TouchableOpacity>
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
        marginTop: 10,
        marginBottom: 10,
        width: '75%',
        alignItems: 'center',
        alignSelf: 'center',
    },
    text: {
        fontSize: 25,
    },
});

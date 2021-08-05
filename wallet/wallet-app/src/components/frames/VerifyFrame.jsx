/* eslint-disable no-plusplus */
/* eslint-disable no-alert */
import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { useDispatch, useSelector } from 'react-redux';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Text } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/FontAwesome';
import { addCredentialShare } from '../../redux/CredentialShareSlice';
import { httpSendPresentation } from '../../utils/httpRequests';
import createVerifiablePresentationJWT from '../../utils/sign';

/**
 * A frame with a botton to send proof to a verifier if you choose to share
 * @returns A frame, sending the proof
 */
export default function VerifyFrame() {
    const [scanned, setScanned] = useState(false);

    const dispatch = useDispatch();
    const { cred } = useSelector((state) => state.credentials);

    async function sendPresentation(creds, audience, user) {
        const jwtCreds = creds.map((c) => c.token);
        const token = await createVerifiablePresentationJWT(jwtCreds, audience, user);
        const verified = await httpSendPresentation(token);

        if (verified) {
            alert('Bevis sendt');
            creds.map((c) =>
                dispatch(
                    addCredentialShare({
                        id: Math.random().toString(),
                        credential_id: c.jti,
                        verifier: audience,
                    })
                )
            );
        } else {
            alert('Bevis ble ikke sendt');
        }
        return verified;
    }

    const handleBarCodeScanned = async ({ data }) => {
        setScanned(true);
        const verifier = data.split('|')[0];
        const vc = data.split('|')[1];

        const userID = data.split('|')[2];
        let proof = '';
        for (let i = 0; i < cred.length; i++) {
            try {
                if (cred[i].vc.credentialSubject.age.type === vc) {
                    proof = cred[i];
                    break;
                }
            } catch (error) {
                proof = '';
            }
        }

        if (proof === '') {
            Alert.alert('Mangler bevis', `Du har ikke beviset som tjenesten spør om: ${vc}`, [
                {
                    text: 'Ok',
                    onPress: () => setScanned(false),
                },
            ]);
        } else {
            Alert.alert(
                'TJENESTE SPØR OM BEVIS',
                `Vil du godkjenne at beviset ${vc} blir sendt til tjeneste ${verifier}?`,
                [
                    {
                        text: 'Ikke godkjenn',
                        onPress: () => setScanned(false),
                        style: 'cancel',
                    },
                    {
                        text: 'Godkjenn',
                        onPress: () => sendPresentation([proof], verifier, userID) && setScanned(false),
                    },
                ]
            );
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'nowrap',
                    marginTop: 25,
                }}>
                <Icon name="question-circle" size={25} color="rgb(30,46,60)" />
                <Text text60 style={{ marginLeft: 10 }}>
                    Skann QR-kode til tjeneste
                </Text>
            </View>

            <View style={styles.camera}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    camera: {
        flex: 1,
        marginTop: 30,
        marginBottom: 50,
        alignItems: 'center',
    },
    instructionText: {
        marginTop: 20,
        fontSize: 20,
        alignSelf: 'flex-start',
    },
});

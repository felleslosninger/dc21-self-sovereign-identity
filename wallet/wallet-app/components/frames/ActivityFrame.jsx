import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Alert } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { useDispatch, useSelector } from 'react-redux';
import { BarCodeScanner } from 'expo-barcode-scanner';
import jwtDecode from 'jwt-decode';
import { useNavigation } from '@react-navigation/native';
import { addCredentialShare } from '../../redux/CredentialShareSlice';
import { httpSendPresentation } from '../../utils/httpRequests';
import createVerifiablePresentationJWT from '../../utils/sign';

/**
 * A frame with a botton to send proof to a verifier if you choose to share
 * @returns A frame, sending the proof
 */
export default function ActivityFrame() {
    const [status, setStatus] = useState(false);
    const dispatch = useDispatch();
    const [scanned, setScanned] = useState(false);
    const navigation = useNavigation();
    const { cred } = useSelector((state) => state.credentials);

   
    async function sendPresentation(creds, audience, user) {
        const jwtCreds = creds.map((c) => c.token);
        const token = await createVerifiablePresentationJWT(jwtCreds, audience, user);
        const verified = await httpSendPresentation(token);
        alert("Bevis sendt");
        if (verified) {
            creds.map((c) =>
            dispatch(
                addCredentialShare({
                    id: Math.random().toString(),
                    credential_id: c.jti,
                    verifier: audience,
                })
            )
        );
        }
        setStatus(verified);
        return verified;
    }

    const handleBarCodeScanned = async ({ type, data }) => {
        setScanned(true);
        const verifier = data.split('|')[0];
        const vc = data.split('|')[1];
        const userID = data.split('|')[2];
        console.log(userID);
        let proof = '';
        for (let i = 0; i < cred.length; i++) {
            if (cred[i].vc.credentialSubject.age.type === vc) {
                proof = cred[i];
            }
        }

        Alert.alert('TJENESTE SPØR OM BEVIS', `Vil du godkjenne at beviset ${vc} blir sendt til tjeneste ${verifier}?`, [
            {
                text: 'Ikke godkjenn',
                onPress: () => navigation.navigate('Oversikt'),
                style: 'cancel',
            },
            { text: 'Godkjenn', onPress: () => sendPresentation([proof], verifier, userID) },
        ]);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* {cred.length > 0 ? (
                cred.map((credential) => (
                    <View>
                        <Button
                            title={`Send bevis ${credential.type} til tjeneste X`}
                            color="#f1940f"
                            onPress={() => sendPresentation([credential], verifier, userID)}
                        />

                        <Text>Du har {status ? 'nå' : 'ikke'} delt beviset</Text>
                    </View>
                ))
            ) : (
                <Text>Du har ingen bevis</Text>
            )} */}

            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
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
        padding: '2%',
    },
    buttonText: {
        fontSize: 20,
        alignSelf: 'center',
    },
    sharedProofText: {
        alignSelf: 'center',
    },
});

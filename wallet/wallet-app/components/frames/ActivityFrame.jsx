import React, { useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { useDispatch, useSelector } from 'react-redux';
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

    const { cred } = useSelector((state) => state.credentials);

    /* UTDATERT
    async function sendCredential() {
        const verified = await httpSendCredential(credential.token);
        setStatus(verified);
        return verified;
    }

    */

    async function sendPresentation(creds, audience) {
        const jwtCreds = creds.map((c) => c.token);
        const token = await createVerifiablePresentationJWT(jwtCreds, audience);
        const verified = await httpSendPresentation(token);
        creds
        .map(c => (dispatch(addCredentialShare({
            id: Math.random().toString(),
            credential_id: c.jti,
            verifier: audience,
        }))))



    
        
        setStatus(verified);
        return verified;
    }

    return (
        <SafeAreaView style={styles.container}>
            {cred.length > 0 ? (
                cred.map((credential) => (
                    <View>
                        <Button
                            title={`Send bevis ${credential.type} til tjeneste X`}
                            color="#f1940f"
                            onPress={() => sendPresentation([credential], 'verifier123')}
                        />
                        <Text>Du har {status ? 'nå' : 'ikke'} delt beviset</Text>
                    </View>
                ))
            ) : (
                <Text>Du har ingen bevis</Text>
            )}
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
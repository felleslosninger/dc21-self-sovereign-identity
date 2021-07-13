/* eslint-disable react/prop-types */
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { useSelector } from 'react-redux';
import Verifier from '../Verifier';
import CreateQR from '../QRcode';

/**
 * Page with an overview of which verifiers who have access to a specific proof
 * @param {proof} param0 a spesific proof
 * @returns Page with a list of all verifiers a proof is shared with
 */
export default function VerifierLogFrame({ route }) {
    const styles = StyleSheet.create({
        shared: {
            fontSize: 20,
        },
    });

    const { shared } = useSelector((state) => state.credentialShares);

    return (
        <SafeAreaView>
            <Text style={styles.shared}>Du har delt beviset {route.params.item.proof} med disse tjenestene.</Text>
            {shared
                .filter((share) => share.credential_id === route.params.item.jti)
                .map((share) => (
                    <Verifier key={share.id} name={share.verifier} />
                ))}
            <Text>En tjeneste kan verifisere beviset ditt med QRkoden under</Text>
            <CreateQR content="digdir.no" /> 
        </SafeAreaView> // content^ could be a jwt, url...
    ); 
}

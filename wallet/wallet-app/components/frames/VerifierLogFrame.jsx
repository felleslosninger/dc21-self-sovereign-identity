/* eslint-disable react/prop-types */
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { useSelector } from 'react-redux';
import Menu from '../Menu';
import Verifier from '../Verifier';

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
                .filter((share) => share.credential_id === route.params.item.id)
                .map((share) => (
                    <Verifier key={share.id} name={share.verifier} />
                ))}
            <Menu />
        </SafeAreaView>
    );
}
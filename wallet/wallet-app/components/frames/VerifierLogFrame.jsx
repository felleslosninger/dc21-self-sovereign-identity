/* eslint-disable react/prop-types */
import React from 'react';
import { StyleSheet } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { useSelector } from 'react-redux';
import { Card, Text } from 'react-native-ui-lib';
import Verifier from '../views/VerifierView';
import CreateQR from '../other/QRCode';

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
        <Card style={{ margin: 25 }}>
            <Card.Section
                content={[
                    { text: route.params.props.name, text50: true, grey10: true },
                    { text: `Utstedt av: ${route.params.props.issuer}`, text100: true, grey40: true },
                    {
                        text: `Gyldighet: ${new Date(
                            route.params.props.issDate * 1000
                        ).toLocaleDateString()} - ${new Date(route.params.props.expDate * 1000).toLocaleDateString()}`,
                        text100: true,
                        grey40: true,
                    },
                    {
                        text: `Beviset er delt med: ${shared
                            .filter((share) => share.credential_id === route.params.props.id)
                            .map((share) => <Verifier key={share.id} name={share.verifier} />)}`,
                        text100: true,
                        grey40: true,
                    },
                ]}
                style={{ padding: 30 }}
            />

            <Card.Section content={[{ text: 'Del beviset med QR-kode:', text100: true, grey40: true }]} />

            {/* 
           <CreateQR style={{ margin: 25 }} content={route.params.props.name} />
           */}

            {/*  <Text style={styles.shared}>Du har delt beviset {route.params.props.name} med disse tjenestene.</Text>
            {shared
                .filter((share) => share.credential_id === route.params.props.id)
                .map((share) => (
                    <Verifier key={share.id} name={share.verifier} />
                ))}
                 */}
        </Card>
    );
}

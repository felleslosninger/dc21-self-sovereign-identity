/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Card } from 'react-native-ui-lib';

/**
 * A proof object/card with info about the issuer, validity, shared with and deletion option.
 * @param {string} props
 * From the ProofOverviewFrame a proof object is sent with corresponding prop values.
 * @returns A proof card/object
 */
export default function Proof(props) {
    const navigation = useNavigation();

    return (
        <Card style={{ margin: 25, marginTop: 10 }} onPress={() => navigation.navigate('Delt med', { props })}>
            <Card.Section
                content={[{ text: props.name, text50: true, grey10: true }]}
                style={{ padding: 30, paddingBottom: 10 }}
            />
            <Card.Section
                content={[
                    { text: `Utstedt av: ${props.issuer}`, text100: true, grey40: true },
                    {
                        text: `Gyldighet: ${new Date(props.issDate * 1000).toLocaleDateString()} - ${new Date(
                            props.expDate * 1000
                        ).toLocaleDateString()}`,
                        text100: true,
                        grey40: true,
                    },
                ]}
                style={{ padding: 30, paddingTop: 0 }}
            />
        </Card>
    );
}

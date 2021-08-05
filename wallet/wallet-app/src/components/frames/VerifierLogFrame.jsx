/* eslint-disable react/prop-types */
import React from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Card, Button } from 'react-native-ui-lib';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CreateQR from '../other/QRCode';
import { removeCredential } from '../../redux/CredentialSlice';

/**
 * Page with an overview of which verifiers who have access to a specific proof
 * @param {proof} param0 a spesific proof
 * @returns Page with a list of all verifiers a proof is shared with
 */
export default function VerifierLogFrame({ route }) {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const { shared } = useSelector((state) => state.credentialShares);

    /**
     * Removes the item for the given key from the async storage and state (in CredentialSlice)
     * @param {string} key
     * key is ID (a prop) to a proof
     * @returns true/false depending on whether proof was removed or not.
     */
    async function removeItemValue(key) {
        dispatch(removeCredential(key)); // removes proof from redux
        try {
            await AsyncStorage.removeItem(key); // removes proof from AsyncStorage
            return true;
        } catch (exception) {
            return false;
        }
    }

    return (
        <SafeAreaView>
            <Card style={{ margin: 25 }}>
                <Card.Section
                    content={[{ text: route.params.props.name, text40: true, grey10: true }]}
                    style={{ padding: 30, paddingBottom: 10 }}
                />
                <Card.Section
                    content={[
                        { text: `Utstedt av: ${route.params.props.issuer}`, text100: true, grey40: true },
                        {
                            text: `Gyldighet: ${new Date(
                                route.params.props.issDate * 1000
                            ).toLocaleDateString()} - ${new Date(
                                route.params.props.expDate * 1000
                            ).toLocaleDateString()}`,
                            text100: true,
                            grey40: true,
                        },
                    ]}
                    style={{ padding: 30, paddingTop: 0, paddingBottom: 0 }}
                />

                <Card.Section
                    content={[{ text: 'Del med QR-kode: ', text70: true, grey40: true }]}
                    style={{ padding: 30, paddingTop: 50, paddingBottom: 10 }}
                />
                <Card style={{ alignSelf: 'center', marginBottom: 20 }}>
                    <CreateQR content={route.params.props.name} />
                </Card>

                {shared.filter((share) => share.credential_id === route.params.props.id).length === 0 ? (
                    <Card.Section
                        content={[
                            {
                                text: 'Beviset er ikke delt',
                                text100: true,
                                grey40: true,
                            },
                        ]}
                        style={{ padding: 30, paddingTop: 10, paddingBottom: 0 }}
                    />
                ) : (
                    <Card.Section
                        content={[
                            {
                                text: `Beviset er delt med: ${shared
                                    .filter((share) => share.credential_id === route.params.props.id)
                                    .map((share) => share.verifier)}`,
                                text100: true,
                                grey40: true,
                            },
                        ]}
                        style={{ padding: 30, paddingTop: 10, paddingBottom: 0 }}
                    />
                )}

                <Button
                    label="Slett bevis"
                    color="rgb(194,19,44)"
                    backgroundColor="white"
                    size={Button.sizes.small}
                    style={{ marginTop: 100, marginBottom: 15 }}
                    onPress={() => {
                        // dispatch(removeCredential(props.id));
                        removeItemValue(route.params.props.id);
                        navigation.navigate('Oversikt');
                    }}
                    text90
                />
            </Card>
        </SafeAreaView>
    );
}

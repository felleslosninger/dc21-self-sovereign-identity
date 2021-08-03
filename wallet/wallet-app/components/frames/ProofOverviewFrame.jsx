/* eslint-disable no-unused-expressions */
/* eslint-disable no-alert */
import { SafeAreaView, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text } from 'react-native-ui-lib';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Proof from '../views/ProofView';

/**
 * A frame with an overview of every proof the wallet has
 * @returns
 */
export default function ProofOverviewFrame() {
    const { cred } = useSelector((state) => state.credentials);
    const navigation = useNavigation();

    function getVcName(item) {
        return Object.values(item.vc.credentialSubject)[0].name;
    }

    return cred.length === 0 ? (
        <SafeAreaView style={styles.container}>
            <Text text40 color="rgb(30,46,60)" style={{ paddingVertical: 10, paddingBottom: 230 }}>
                Du har ingen bevis.
            </Text>

            <Icon
                style={{ paddingTop: 8, alignItems: 'center', justifyContent: 'center' }}
                name="plus"
                size={60}
                color="rgb(30,46,60)"
                onPress={() => navigation.navigate('Hent bevis')}
            />
            <Text
                onPress={() => navigation.navigate('Hent bevis')}
                text90
                color="rgb(30,46,60)"
                style={{ paddingVertical: 10 }}>
                Legg til bevis
            </Text>
        </SafeAreaView>
    ) : (
        <SafeAreaView>
            <FlatList
                marginTop={25}
                keyExtractor={(item) => item.jti}
                data={cred}
                renderItem={({ item }) => (
                    <Proof
                        id={item.jti}
                        name={getVcName(item)}
                        // fix issuer display / handle issuerid
                        issuer={item.iss.substring(0, item.iss.length - 36)}
                        issDate={item.iat}
                        expDate={item.exp}
                    />
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    theProofs: {
        backgroundColor: 'lightgrey',
        padding: 10,
        fontSize: 20,
        marginVertical: 3,
        marginHorizontal: 16,
        borderRadius: 4,
        alignItems: 'center',
    },
    textProofs: {
        fontSize: 40,
        marginTop: '12%',
    },
    logOut: {
        borderRadius: 4,
        backgroundColor: 'rgb(0,98,184)',
        padding: 10,
        marginTop: 10,
        marginBottom: 30,
        width: 75,
        alignSelf: 'flex-end',
        right: 5,
    },
    container: {
        width: '80%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 80,
    },
});

/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import { TouchableOpacity, SafeAreaView, Text, StyleSheet } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * The intro page to the app, choose between log in or create a user
 * @returns Two buttons/options: "access control" or "create user"
 */
export default function StartPage() {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [onboarded, setOnboarded] = useState(false);

    const checkOnboarded = async () => {
        const baseId = await AsyncStorage.getItem('baseId');
        const walletId = await AsyncStorage.getItem('walletID');
        const privateKey = await AsyncStorage.getItem('privateKey');
        const pin = await AsyncStorage.getItem('pin');

        if (baseId && walletId && privateKey && pin) {
            setOnboarded(true);
        } else {
            setOnboarded(false);
        }
    };

    isFocused ? checkOnboarded() : null;

    return (
        <SafeAreaView style={styles.container}>
            {onboarded ? (
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Adgangskontroll')}>
                    <Text style={styles.text}>Logg inn i lommeboka</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Opprett bruker')}>
                    <Text style={styles.text}>Opprett bruker</Text>
                </TouchableOpacity>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 175,
        alignItems: 'center',
    },
    button: {
        borderRadius: 4,
        backgroundColor: 'rgb(0,98,184)',
        padding: 20,
        marginTop: 10,
        marginBottom: 10,
        width: '75%',
        alignItems: 'center',
        alignSelf: 'center',
    },
    text: {
        fontSize: 25,
        color: 'white',
    },
});

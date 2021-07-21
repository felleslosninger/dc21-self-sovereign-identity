/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import { TouchableOpacity, SafeAreaView, Text, StyleSheet, Platform } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateKeys } from '../../utils/sign';

/**
 * The intro page to the app, choose between log in or create a user
 * @returns Two buttons/options: "access control" or "create user"
 */
export default function StartPage() {
    const navigation = useNavigation();
    const [hasBaseId, setBaseID] = useState(false);
    const isFocused = useIsFocused();

    const checkBaseId = async () => {
        const value = await AsyncStorage.getItem('baseId');
        if (value !== null) {
            setBaseID(true);
        }
    };

    // ----------
    // Skip onboarding when launcing on web

    const exampleBaseVc =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIwODA4OTQwODA4NCIsImlzcyI6IkdydW5uSUQtcG9ydGFsZW4ubm85NDAxNWViYi0yMzBjLTQyMWQtOWMwZC1mNDE2NjEzNzQwNzgiLCJleHAiOjE2Mjc5MDU1MzMsImlhdCI6MTYyNjY5NTkzMywidmMiOnsiY3JlZGVudGlhbFN1YmplY3QiOnsiYmFzZWlkIjp7Im5hbWUiOiJCYXNlSUQiLCJ0eXBlIjoiQmFzZUlEIn19LCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiQmFzZUNyZWRlbnRpYWwiXSwiQGNvbnRleHQiOlsiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvdjEiXX0sImp0aSI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4My9jcmVkZW50aWFscy8xIn0.hNGmIyFzRIRm0dM0QX94umAt9egcN0mZ7zwVifAxsfMe7n4KQG5mtTRF7eDSecUicov24lskL09LhEDHGNY9EThjVOfh3cKoZd5g78qdARgpWnaXeFRDZ8Nx7mqUeKq1O4yiMcgc81pQJrH09lFfp-5PIj4KYSDLJxNFIuAOSonNpaiIHEJrwpqziWZhci15MBg7Zyu7xgD4-NWw6uc6lwDavCQ_CGB8tO2j-rMZuxHlwvjxgBVyXKTayPnPAUyiBE6xERt4NH9zTCMhSNua4nPlq4FqwFzbUEYpFbkw-UvJGSb7o0FhJqt0RP0Zdrv5Hs95tC0KP0-trNtViO7NAg';

    const skipOnboarding = async () => {
        await AsyncStorage.setItem('pin', '1111');
        await AsyncStorage.setItem('baseId', exampleBaseVc);
        await generateKeys();
    };

    const checkPlatform = () => {
        if (Platform.OS === 'web') {
            skipOnboarding();
        }
    };

    isFocused ? checkPlatform() : null;

    // ----------

    checkBaseId();

    return (
        <SafeAreaView style={styles.container}>
            {hasBaseId ? (
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
        backgroundColor: '#3aa797',
        padding: 20,
        marginTop: 10,
        marginBottom: 10,
        width: '75%',
        alignItems: 'center',
        alignSelf: 'center',
    },
    text: {
        fontSize: 25,
    },
});

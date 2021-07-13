import React from 'react';
import { Text, SafeAreaView, StyleSheet } from 'react-native';

export default function Onboarding() {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Opprettelse av bruker</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 175,
        alignItems: 'center',
    },
});

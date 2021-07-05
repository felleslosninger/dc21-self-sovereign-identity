import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ConsentButton from './ConsentButton';

export default function Verifier(props) {
    const styles = StyleSheet.create({
        theProofs: {
            backgroundColor: '#CDE8C5',
            padding: 10,
            fontSize: 20,
            marginVertical: 3,
            marginHorizontal: 16,
            borderRadius: 4,
            alignItems: 'center',
        },
        textProofs: {
            fontSize: 40,
        },
    });

    return (
        <View style={styles.theProofs}>
            <Text style={styles.textProofs}>{props.name}</Text>
            <ConsentButton />
        </View>
    );
}

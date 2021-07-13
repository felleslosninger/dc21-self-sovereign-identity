import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

/**
 * Toggle button that changes between true/false depending on if you want/not want to share information
 * @returns Toggle button and text describing the status of the button (boolean)
 */
export default function ConsentButton() {
    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
        },
    });

    const [isAccepted, setIsAccepted] = useState(false); // in the beginning it has not been accepted to share proof
    const toggleSwitch = () => setIsAccepted((previousState) => !previousState); // shares proof when you press toggle (isAccepted change true/false to the opposite of what it was)
    return (
        <View style={styles.container}>
            <Text>Ønsker du å dele informasjon?</Text>
            <Switch
                trackColor={{ false: '#949494', true: '#8cc43c' }}
                thumbColor={isAccepted ? '#ffaf7a' : '#f4f3f4'}
                ios_backgroundColor="#f00af7a" // "#f5f5f5"
                onValueChange={toggleSwitch}
                onChange={toggleSwitch}
                value={isAccepted}
            />
            <Text>Nå {isAccepted ? 'deler' : 'tilbakeholder'} du informasjon.</Text>
        </View>
    );
}

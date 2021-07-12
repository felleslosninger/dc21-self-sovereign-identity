import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

export default function ConsentButton() {
    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
        },
    });

    const [isAccepted, setIsAccepted] = useState(false); // fra start har man ikke akseptert å dele vc
    const toggleSwitch = () => setIsAccepted((previousState) => !previousState); // deler vc når du trykker på toggle

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

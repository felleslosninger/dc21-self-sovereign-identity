import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useSelector, useDispatch } from 'react-redux';
import { removeCredential } from '../redux/CredentialSlice';

export default function Proof() {
    const navigation = useNavigation();

    const { cred } = useSelector((state) => state.credentials);
    const dispatch = useDispatch(); // To call every reducer that we want

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            marginTop: '12%',
        },
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
        proofLog: {
            borderRadius: 4,
            backgroundColor: 'rgb(242, 242, 242)',
            padding: 10,
            marginTop: 10,
        },
    });

    return (
        <FlatList
            keyExtractor={(item) => item.jti}
            data={cred}
            renderItem={({ item }) => (
                <View style={styles.theProofs}>
                    <Text style={styles.textProofs}> {item.vc}</Text>
                    <Text> Utstedt av: {item.iss}</Text>
                    <Text>
                        Gyldig fra/til: {new Date(item.iat).toLocaleString()}/{new Date(item.exp).toLocaleString()}
                    </Text>
                    <TouchableOpacity style={styles.proofLog} onPress={() => navigation.navigate('Delt med', { item })}>
                        <Text>Delt med</Text>
                    </TouchableOpacity>
                    <Button
                        title="Fjern bevis"
                        onPress={() => {
                            dispatch(removeCredential(item.jti));
                        }}
                    />
                </View>
            )}
        />
    );
}

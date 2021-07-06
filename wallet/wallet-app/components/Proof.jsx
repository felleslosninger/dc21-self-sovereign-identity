import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { removeCredential } from '../redux/CredentialSlice';

export default function Proof(props) {
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

    async function removeItemValue(key) {
        dispatch(removeCredential(key));
        console.log(cred);
        try {
            await AsyncStorage.removeItem(key);
            return true;
        } catch (exception) {
            return false;
        }
    }

    return (
        <View style={styles.theProofs}>
            <Text style={styles.textProofs}> {props.name}</Text>
            <Text> Utstedt av: {props.issuer}</Text>
            <Text>
                Gyldig fra/til: {props.issDate}/{props.expDate}
            </Text>
            <TouchableOpacity style={styles.proofLog} onPress={() => navigation.navigate('Delt med', { props })}>
                <Text>Delt med</Text>
            </TouchableOpacity>
            <Button
                title="Fjern bevis"
                // onPress={() => {
                //     dispatch(removeCredential(props.id));
                // }}
                onPress={() => {
                    removeItemValue(props.id);
                }}
            />
        </View>
    );
}

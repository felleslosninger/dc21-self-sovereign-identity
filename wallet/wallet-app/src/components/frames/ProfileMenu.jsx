/* eslint-disable no-alert */
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView, View, StyleSheet, Alert, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import { Button, Text } from 'react-native-ui-lib';
import { signIn } from '../../redux/SignedInSlice';

/**
 * A profile site for administrativ changes on the profile
 * @returns A new site, A logout button and a delete button
 */
export default function ProfileMenuSlide() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [baseIdIssuer, setBaseIdIssuer] = useState('');
    const [walletID, setWalletID] = useState('');

    const getBaseIdIssuer = async () => {
        const baseIdToken = await AsyncStorage.getItem('baseId');
        const decoded = jwtDecode(baseIdToken);
        setBaseIdIssuer(decoded.iss);
    };

    getBaseIdIssuer();

    const getWalletId = async () => {
        const walletId = await AsyncStorage.getItem('walletID');
        setWalletID(walletId);
    };

    getWalletId();

    const clearAllData = async () => {
        const keys = await AsyncStorage.getAllKeys();
        keys.map((key) => AsyncStorage.removeItem(key));
    };

    const deleteUserPressed = async () => {
        try {
            await AsyncStorage.removeItem('baseId'); // removes proof from AsyncStorage
            await AsyncStorage.removeItem('pin'); // removes pin from AsyncStorage
            await AsyncStorage.removeItem('privateKey');
            await AsyncStorage.removeItem('walletID');
            dispatch(signIn(false));
            if (await AsyncStorage.getAllKeys()) {
                clearAllData();
            }
            alert('Din bruker er slettet.');
        } catch (exception) {
            alert('Noe gikk galt...');
        }
    };

    /**
     * Allert button so that it is not clicked by accident
     * @returns Allert Button
     */
    const buttonAlert = async () => {
        if (Platform.OS === 'ios' || Platform.OS === 'android') {
            // Should add PIN code confirmation to delete user
            Alert.alert('VARSEL', 'Er du sikker på at du vil slette brukeren?', [
                {
                    text: 'Cancel',
                    onPress: () => navigation.navigate('Profil'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => deleteUserPressed() },
            ]);
        } else {
            alert('VARSEL: Brukeren din vil nå bli slettet!');
            deleteUserPressed();
        }
    };

    return (
        <SafeAreaView style={{ display: 'flex', flexDirection: 'column', flexWrap: 'nowrap', alignContent: 'center' }}>
            <View style={{ alignItems: 'flex-end', marginRight: 20, marginTop: 20 }}>
                <Button
                    label="Logg ut"
                    backgroundColor="rgb(0,98,184)"
                    size={Button.sizes.small}
                    onPress={() => dispatch(signIn(false))}
                    text90
                />
            </View>
            <View style={styles.container} marginTop={80}>
                <Icon name="user-circle" size={220} color="rgb(30,46,60)" />
            </View>
            <View>
                <Text style={styles.textstyle}>Kari Nordman</Text>
            </View>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'nowrap',
                    marginTop: 5,
                    alignSelf: 'center',
                }}>
                <Icon name="check" size={10} color="#a9a9a9" />

                <Text text100 grey40 style={{ marginLeft: 4, marginTop: -3 }}>
                    Godkjent av {baseIdIssuer.substring(0, baseIdIssuer.length - 36)}
                </Text>
            </View>

            <Text text90 style={{ marginLeft: 10, alignSelf: 'center', marginTop: 130 }}>
                ID: {walletID.substring(walletID.length - 36)}
            </Text>

            {/**
             *  Du har grunnidentitet utstedt fra: {baseIdIssuer}
             */}
            <View width={320} style={{ alignSelf: 'center' }}>
                <Button
                    label="Slett bruker"
                    color="rgb(194,19,44)"
                    backgroundColor="transparent"
                    style={{ marginTop: 10 }}
                    size={Button.sizes.small}
                    onPress={buttonAlert}
                    text90
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        alignSelf: 'center',
        paddingHorizontal: 20,
    },
    textstyle: {
        fontSize: 40,
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 5,
        alignSelf: 'center',
        color: 'rgb(30,46,60)',
    },
    logOut: {
        borderRadius: 4,
        backgroundColor: 'rgb(0,98,184)',
        padding: 10,
        marginTop: 10,
        marginBottom: 30,
        width: 250,
        alignSelf: 'center',
        right: 5,
        alignItems: 'center',
    },
    deleteUser: {
        borderRadius: 4,
        backgroundColor: '#FF5733',
        padding: 10,
        marginTop: 10,
        marginBottom: 30,
        width: 150,
        alignSelf: 'center',
        right: 5,
        alignItems: 'center',
    },
    issuerText: {
        marginTop: 70,
        marginBottom: 100,
        paddingHorizontal: 20,
        color: 'rgb(30,46,60)',
        textAlign: 'center',
        fontSize: 20,
    },
    buttonTextlogOut: {
        fontSize: 20,
        color: 'white',
    },
    buttonTextDeleteUser: {
        fontSize: 15,
    },
});

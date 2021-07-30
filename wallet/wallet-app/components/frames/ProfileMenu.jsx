import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView, TouchableOpacity, Text, View, StyleSheet, Alert, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import { signIn } from '../../redux/SignedInSlice';

/**
 * A profile site for administrativ changes on the profile
 * @returns A new site, A logout button and a delete button
 */
export default function ProfileMenuSlide() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [baseIdIssuer, setBaseIdIssuer] = useState('');

    const getBaseIdIssuer = async () => {
        const baseIdToken = await AsyncStorage.getItem('baseId');
        const decoded = jwtDecode(baseIdToken);
        setBaseIdIssuer(decoded.iss);
    };

    getBaseIdIssuer();

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
                    onPress: () => navigation.navigate('Oversikt'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => deleteUserPressed() },
            ]);
        } else {
            alert('VARSEL: Brukeren din vil nå bli slettet!');
            /*
            const attemptedPin = prompt('Oppgi PIN-kode for å slette bruker:');
            const actualPin = await AsyncStorage.getItem('pin');
            if (attemptedPin === actualPin) {
                deleteUserPressed();
            }
            */
            deleteUserPressed();
        }
    };

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Icon name="user" size={100} color="black" />
            </View>
            <Text style={styles.textstyle}>Her kan du administrere profilen din</Text>
            <Text style={styles.issuerText}>Du har grunnidentitet utstedt fra: {baseIdIssuer}</Text>

            <TouchableOpacity style={styles.logOut} onPress={() => dispatch(signIn(false))}>
                <Text style={styles.buttonTextlogOut}>Logg ut</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteUser} onPress={buttonAlert}>
                <Text style={styles.buttonTextDeleteUser}>Slett Bruker</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        alignSelf: 'center',
    },
    textstyle: {
        fontSize: 20,
        marginLeft: 30,
        alignSelf: 'center',
    },
    logOut: {
        borderRadius: 4,
        backgroundColor: '#3aa797',
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
        marginBottom: 150,
        color: 'green',
        textAlign: 'center',
        fontSize: 20,
    },
    buttonTextlogOut: {
        fontSize: 20,
    },
    buttonTextDeleteUser: {
        fontSize: 15,
    },
});

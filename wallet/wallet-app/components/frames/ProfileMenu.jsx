import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView, TouchableOpacity, Text, View, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { signIn } from '../../redux/SignedInSlice';
import { useNavigation } from '@react-navigation/native';


export default function ProfileMenuSlide() {
    const dispatch = useDispatch(); // To call every reducer that we want
    const navigation = useNavigation();

    const buttonAlert= () =>
    Alert.alert(
      "VARSEL",
      "Er du sikker på at du vil slette brukeren?",
      [
        {
          text: "Cancel",
          onPress: () => navigation.navigate('Oversikt'),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );


    return (
        <SafeAreaView>
            <View style={styles.container}>
             <Icon name='user' size={100} color='black' />
            </View>
            <Text style={styles.textstyle}>Her kan du administrere profilen din</Text>

            <TouchableOpacity style={styles.logOut} onPress={() => dispatch(signIn(false))}>
                <Text>Logg ut</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logOut} onPress={buttonAlert}>
                <Text>Slett Bruker</Text>
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
        width: 75,
        alignSelf: 'center',
        right: 5,
    }
})



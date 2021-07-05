import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Menu() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Oversikt')}>
                <Icon name="vcard" size={25} color="black" />
                <Text>Oversikt</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonTo} onPress={() => navigation.navigate('Forespørsler')}>
                <Icon name="plus" size={25} color="black" />
                <Text>Hent bevis</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonTre} onPress={() => navigation.navigate('Aktivitet')}>
                <Icon name="qrcode" size={25} color="black" justifyContent="center" alignItems="center" />
                <Text>Send bevis</Text>
            </TouchableOpacity>
        </View>
    );
}
// https://weloveiconfonts.com/ ikoner

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        // justifyContent: 'flex-end', //'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 0,
        position: 'absolute',
        bottom: 0,
        paddingVertical: 6,
        backgroundColor: '#87D7BF',
    },
    button: {
        flex: 1,
        // justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
        width: 100,
        height: 50,
    },
    buttonTo: {
        flex: 1,
        // justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
        width: 100,
        height: 50,
    },
    buttonTre: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        width: 100,
        height: 50,
    },
});

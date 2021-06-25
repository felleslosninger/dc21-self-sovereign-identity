import React from 'react';
import { View, Text, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';

const Separator = () => <View style={styleSheets.separator} />;

export default function Menu() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Oversikt')}>
        <Text>Oversikt</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonTo} onPress={() => navigation.navigate('Forespørsler')}>
        <Text>Hent bevis</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonTre} onPress={() => navigation.navigate('Aktivitet')}>
        <Text>Send bevis</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
  button: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#CDE6EA',
    padding: 10,
    width: 100,
    height: 50,
  },
  buttonTo: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#CDE6EA',
    padding: 10,
    width: 100,
    height: 50,
  },
  buttonTre: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    backgroundColor: '#CDE6EA',
    padding: 10,
    width: 100,
    height: 50,
  },
});

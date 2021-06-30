//SKAL IKKE BRUKES ENDA

import React, { useState } from 'react';

import { SafeAreaView, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Menu from '../../components/Menu';
import * as RNFS from 'react-native-fs';

export default function RequestFrame() {
  const [selectedIssuer, setSelectedIssuer] = useState('sv');
  const [credential, setCredential] = useState('Ingen bevis hentet.');
  const [statement, setStatement] = useState(null);
  async function sendCredentialRequest() {
    //let url = 'http://localhost:8083/api/getCredential/';
    //let statement = 'Gyldig førerkort klasse B.';

    let verifiedStatement = await httpGetCredential(statement);
    setCredential(verifiedStatement);
  }

  //var RNFS = require('react-native-fs');

  var path = RNFS.ExternalDirectoryPath + 'test.txt';

  RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
    .then((success) => {
      console.log('FILE WRITTEN');
    })
    .catch((err) => {
      console.log(err.message);
    });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Forespørsel om nytt bevis </Text>

      <SafeAreaView style={styles.issuer}>
        <Text style={styles.text}>Velg utsteder </Text>

        <Picker
          selectedValue={selectedIssuer}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedIssuer(itemValue)}
        >
          <Picker.Item label="NTNU" value="ntnu" />
          <Picker.Item label="Statens Vegvesen" value="sv" />
          <Picker.Item label="Folkeregisteret" value="fr" />
        </Picker>
      </SafeAreaView>

      <SafeAreaView style={styles.proof}>
        <Text style={styles.text}>Ønsket bevis</Text>
        <TextInput
          style={styles.input}
          onChangeText={setStatement}
          value={statement}
          placeholder="Bevis"
        ></TextInput>
      </SafeAreaView>

      <TouchableOpacity onPress={RNFS.writeFile}>
        <SafeAreaView style={styles.button}>
          <Text style={styles.buttonText}>Send forespørsel</Text>
        </SafeAreaView>
      </TouchableOpacity>
      <SafeAreaView>
        <Text>{credential}</Text>
      </SafeAreaView>
      <Menu></Menu>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '18%',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 13,
  },
  issuer: {
    marginTop: '1%',
  },
  text: {
    fontSize: 25,
    marginLeft: 30,
  },
  picker: {
    width: '80%',
    alignSelf: 'center',
  },
  input: {
    borderColor: '#add8e6',
    borderWidth: 2,
    borderRadius: 2,
    width: '80%',
    alignSelf: 'center',
  },
  proof: {
    marginTop: '3%',
  },
  button: {
    marginTop: '5%',
    backgroundColor: '#add8e6',
    alignItems: 'center',
    borderRadius: 5,
    width: '80%',
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 20,
  },
});
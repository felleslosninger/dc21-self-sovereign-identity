import React, { useState, useEffect } from 'react';

//import { saveProof, getProof } from './ASFunctions';

// import all the components we are going to use
import { SafeAreaView, StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

export default function Storage() {
  const [firstProof, setFirstProof] = useState('');

  const saveProof = async () => {
    if (firstProof) {
      await AsyncStorage.setItem('key', firstProof);
    }
  };

  const getProof = async () => {
    try {
      const value = await AsyncStorage.getItem('key');
      if (value !== null) {
        console.log(value);
        return value;
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.titleText}>AsyncStorage in React Native to Store Data in Session</Text>
        <TextInput
          placeholder="Enter Some Text here"
          defaultValue={firstProof}
          onChangeText={(proof) => setFirstProof(proof)}
          style={styles.textInputStyle}
        />
        <TouchableOpacity onPress={saveProof} style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}> SAVE VALUE </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => getProof()} style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}> GET VALUE </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    textAlign: 'center',
  },
  buttonStyle: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'green',
    padding: 5,
    marginTop: 32,
    minWidth: 250,
  },
  buttonTextStyle: {
    padding: 5,
    color: 'white',
    textAlign: 'center',
  },
  textInputStyle: {
    textAlign: 'center',
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: 'green',
  },
});

import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { removeCredential } from '../redux/CredentialSlice';

export default function Proof() {
    const navigation = useNavigation();

    const { cred } = useSelector((state) => state.credentials);
    const dispatch = useDispatch(); // To call every reducer that we want

    /* STORAGE - IKKE FJERN
    
import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused } from '@react-navigation/native';

    const [proofs, setProofs] = useState([]);
  const [keys, setKeys] = useState([]);

  const isFocused = useIsFocused();

  const getProofs = async () => {
    try {
      for (let key = 0; key < keys.length; key++) {
        const value = await AsyncStorage.getItem(keys[key]);
        if (value !== null) {
          console.log(value);
          if (!proofs.some((item) => item.id == keys[key])) {
            proofs.push({ id: keys[key], proof: value });
          }
        }
        console.log('Proofs:', proofs);
      }
    } catch (error) {
      alert(error);
    }
  };

  const getKeys = async () => {
    try {
      const theKeys = await AsyncStorage.getAllKeys();
      console.log(theKeys);
      if (theKeys !== null) {
        for (let i = 0; i < theKeys.length; i++) {
          if (!keys.includes(theKeys[i])) {
            keys.push(theKeys[i]);
            console.log(keys);
          }
        }
      }
      console.log(keys);
      getProofs();
    } catch (error) {
      alert(error);
    }
  };

  isFocused ? getKeys() : null;

  END STORAGE
  */

    // const proofs = [
    //   {
    //     id: Math.random().toString(),
    //     proof: 'førerkort-klasse-B',
    //   },
    //   {
    //     id: Math.random().toString(),
    //     proof: 'er-sykepleier',
    //   },
    //   {
    //     id: Math.random().toString(),
    //     proof: theProof,
    //   },
    // ];

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
            keyExtractor={(item) => item.id}
            data={cred}
            renderItem={({ item }) => (
                <View style={styles.theProofs}>
                    <Text style={styles.textProofs}> {item.proof}</Text>
                    <Text> Utstedt av: {item.issuer}</Text>
                    <Text>
                        Gyldig fra/til: {item.issuedDate}/{item.expiryDate}
                    </Text>
                    <TouchableOpacity style={styles.proofLog} onPress={() => navigation.navigate('Delt med', { item })}>
                        <Text>Delt med</Text>
                    </TouchableOpacity>
                    <Button
                        title="Fjern bevis"
                        onPress={() => {
                            dispatch(removeCredential(item.id));
                        }}
                    />
                </View>
            )}
        />
    );
}
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { addCredential } from '../../redux/CredentialSlice';

export default function storage() {
    // const dispatch = useDispatch(); // To call every reducer that we want. Using dispatch to communicate with state management

    const [proofs, setProofs] = useState([]);
    const [keys, setKeys] = useState([]);
    const [vcType, getVcType] = useState('');

    const saveProof = async (cred) => {
        if (vcType && cred.jti !== undefined) {
            try {
                await AsyncStorage.setItem(cred.jti, JSON.stringify(cred));
            } catch (error) {
                alert(error);
            }
        }
    };

    /**
     * Adds the keys and the associated information into a list
     */
    const getProofs = async () => {
        try {
            for (let key = 0; key < keys.length; key++) {
                const value = await AsyncStorage.getItem(keys[key]);
                if (value !== null) {
                    if (!proofs.some((item) => item.id === keys[key])) {
                        // Makes sure that there are no duplicates
                        proofs.push({ id: keys[key], proof: value });
                        // dispatch(addCredential(JSON.parse(value)));
                    }
                }
            }
        } catch (error) {
            alert(error);
        }
    };

    /**
     * Gets all the keys in AsyncStorage, except for the pin key
     * Adds the keys into a list
     */
    const getKeys = async () => {
        try {
            const theKeys = await AsyncStorage.getAllKeys();
            if (theKeys !== null) {
                for (let i = 0; i < theKeys.length; i++) {
                    if (
                        !keys.includes(theKeys[i]) &&
                        theKeys[i] !== 'pin' &&
                        theKeys[i] !== 'baseId' &&
                        theKeys[i] !== 'privateKey' &&
                        theKeys[i] !== 'walletID'
                    ) {
                        keys.push(theKeys[i]);
                    }
                }
            }
            getProofs();
        } catch (error) {
            alert(error);
        }
    };
}

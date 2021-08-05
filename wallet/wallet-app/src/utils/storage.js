/* eslint-disable no-alert */
import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveProof = async (cred) => {
    if (cred.jti !== undefined) {
        try {
            await AsyncStorage.setItem(cred.jti, cred.token);
            return true;
        } catch (error) {
            alert(error);
        }
    }
    return false;
};

/**
 * Adds the keys and the associated information into a list
 */
export const getProofs = async (keys) => {
    const proofs = [];
    try {
        keys.forEach(async (key) => {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                if (!proofs.some((item) => item.id === key)) {
                    // Makes sure that there are no duplicates
                    proofs.push({ id: key, proof: value });
                    // dispatch(addCredential(JSON.parse(value)));
                }
            }
        });
    } catch (error) {
        alert(error);
    }
    return proofs;
};

/**
 * Gets all the proof keys in AsyncStorage
 * Adds the keys into a list
 */
export const getProofKeys = async () => {
    const keys = [];
    try {
        const allKeys = await AsyncStorage.getAllKeys();
        if (allKeys !== null) {
            allKeys.forEach((key) => {
                if (
                    !keys.includes(key) &&
                    key !== 'pin' &&
                    key !== 'baseId' &&
                    key !== 'privateKey' &&
                    key !== 'walletID'
                ) {
                    keys.push(key);
                }
            });
        }
    } catch (error) {
        alert(error);
    }
    return keys;
};

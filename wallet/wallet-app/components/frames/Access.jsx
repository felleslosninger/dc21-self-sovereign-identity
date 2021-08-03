/* eslint-disable no-unused-expressions */
/* eslint-disable no-alert */
import Icon from 'react-native-vector-icons/Ionicons';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StatusBar, Text, TouchableOpacity, Vibration } from 'react-native';
import ReactNativePinView from 'react-native-pin-view';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { signIn } from '../../redux/SignedInSlice';

/**
 * Creates a PIN code and a login page where you enter the pin and one delete pin button
 * @returns Log-in page
 */
export default function Access() {
    const pinView = useRef(null);
    const [showRemoveButton, setShowRemoveButton] = useState(false);
    const [enteredPin, setEnteredPin] = useState('');
    const [showCompletedButton, setShowCompletedButton] = useState(false);
    const [check, setCheck] = useState('');
    const [text, setText] = useState('');

    const dispatch = useDispatch();
    // const { signedIn } = useSelector((state) => state.signedInStatus);

    const isFocused = useIsFocused();

    const DURATION = 1000;

    useEffect(() => {
        if (enteredPin.length > 0) {
            setShowRemoveButton(true);
        } else {
            setShowRemoveButton(false);
        }
        if (enteredPin.length === 4) {
            setShowCompletedButton(true);
        } else {
            setShowCompletedButton(false);
        }
    }, [enteredPin]);

    /**
     * Checks if the user already has a PIN-code for the wallet
     */
    const checkHasPin = async () => {
        const pin = await AsyncStorage.getItem('pin');
        if (pin === null) {
            setCheck(false);
        } else {
            setCheck(true);
        }
        changeText();
    };

    const changeText = () => {
        check ? setText('Skriv inn personlig kode') : setText('Opprett personlig kode');
    };

    isFocused ? checkHasPin() : null;

    /**
     * If user does not have a PIN-code, the user creates a code
     * If user has PIN-code it chekcs the enter pin with the users code
     */
    const checkPin = async () => {
        if (check === false) {
            await AsyncStorage.setItem('pin', enteredPin);
            alert(`Personlig kode opprettet: ${enteredPin}`);
        } else {
            const thePin = await AsyncStorage.getItem('pin');
            if (enteredPin === thePin) {
                dispatch(signIn(true));
            } else {
                Vibration.vibrate(DURATION);
                alert('Wrong PIN code');
                pinView.current.clearAll();
            }
        }
    };

    /**
     * Clears the inputarea
     */
    const clearPin = () => {
        if (text === 'Opprett personlig kode') {
            pinView.current.clearAll();
        }
    };

    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: 'rgb(242, 242, 242)',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text
                    style={{
                        paddingTop: 10,
                        paddingBottom: 20,
                        color: 'rgb(30,46,60)',
                        fontSize: 30,
                    }}>
                    {text}
                </Text>

                <ReactNativePinView
                    inputSize={10}
                    ref={pinView}
                    pinLength={4}
                    buttonSize={60}
                    onValueChange={(value) => setEnteredPin(value)}
                    buttonAreaStyle={{
                        marginTop: 10,

                        marginHorizontal: 40,
                    }}
                    inputAreaStyle={{
                        marginBottom: 10,
                    }}
                    inputViewEmptyStyle={{
                        backgroundColor: 'transparent',
                        borderWidth: 1,
                        borderColor: 'rgb(30,46,60)',
                    }}
                    inputViewFilledStyle={{
                        backgroundColor: 'rgb(30,46,60)',
                    }}
                    buttonViewStyle={{
                        borderWidth: 1,
                        borderColor: 'rgb(30,46,60)',
                        backgroundColor: 'transparent',
                    }}
                    buttonTextStyle={{
                        color: 'rgb(30,46,60)',
                    }}
                    onButtonPress={(key) => {
                        if (key === 'custom_left') {
                            pinView.current.clear();
                        }
                    }}
                    customLeftButton={
                        showRemoveButton ? <Icon name="ios-backspace" size={36} color="rgb(30,46,60)" /> : undefined
                    }
                    customRightButton={
                        showCompletedButton ? (
                            <Icon
                                name="arrow-forward-outline"
                                size={36}
                                color="rgb(30,46,60)"
                                onPress={() => checkPin() && checkHasPin() && clearPin()}
                            />
                        ) : undefined
                    }
                />
            </SafeAreaView>
            {/*
             <TouchableOpacity
                style={{
                    borderRadius: 4,
                    backgroundColor: 'rgb(30,46,60)',
                    alignItems: 'center',
                    width: 150,
                    marginBottom: 10,
                    marginLeft: 10,
                }}
                onPress={() => AsyncStorage.removeItem('pin') && checkHasPin() && alert('Personlig kode slettet')}>
                <Text style={{ color: 'white' }}>Slett personlig kode</Text>
            </TouchableOpacity>
            */}
        </>
    );
}

// "SLETT PERSONLIG KODE" SKAL IKKE MED TIL SLUTT, DEN ER DER BARE I TILFELLE VI GLEMMER KODEN VÅR, ELLER NOE LIGNENDE

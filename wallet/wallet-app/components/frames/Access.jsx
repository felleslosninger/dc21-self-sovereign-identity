import Icon from 'react-native-vector-icons/Ionicons';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StatusBar, Text, Vibration } from 'react-native';
import ReactNativePinView from 'react-native-pin-view';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { signIn } from '../../redux/SignedInSlice';

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

    const checkHasPin = async () => {
        const pin = await AsyncStorage.getItem('key');
        if (pin === null) {
            setCheck(false);
        } else {
            setCheck(true);
        }
        changeText();
    };

    const changeText = () => {
        if (check === true) {
            setText('Skriv inn personlig kode');
        } else setText('Opprett personlig kode');
    };

    isFocused ? checkHasPin() : null;

    const checkPin = async () => {
        if (check === false) {
            await AsyncStorage.setItem('key', enteredPin);
            // const pin = await AsyncStorage.getItem('key');
            // console.log('The new PIN ', pin);
        } else {
            const thePin = await AsyncStorage.getItem('key');
            if (enteredPin === thePin) {
                dispatch(signIn(true));
            } else {
                Vibration.vibrate(DURATION);
                alert('Wrong PIN code');
                pinView.current.clearAll();
            }
        }
    };

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
                        paddingTop: 24,
                        paddingBottom: 20,
                        color: '#7B7676',
                        fontSize: 30,
                    }}>
                    {text}
                </Text>

                <ReactNativePinView
                    inputSize={32}
                    ref={pinView}
                    pinLength={4}
                    buttonSize={60}
                    onValueChange={(value) => setEnteredPin(value)}
                    buttonAreaStyle={{
                        marginTop: 24,
                    }}
                    inputAreaStyle={{
                        marginBottom: 15,
                    }}
                    inputViewEmptyStyle={{
                        backgroundColor: 'transparent',
                        borderWidth: 1,
                        borderColor: '#3aa797',
                    }}
                    inputViewFilledStyle={{
                        backgroundColor: '#3aa797',
                    }}
                    buttonViewStyle={{
                        borderWidth: 1,
                        borderColor: '#3aa797',
                        backgroundColor: 'rgb(242, 242, 242)',
                    }}
                    buttonTextStyle={{
                        color: '#3aa797',
                    }}
                    onButtonPress={(key) => {
                        if (key === 'custom_left') {
                            pinView.current.clear();
                        }
                    }}
                    customLeftButton={
                        showRemoveButton ? <Icon name="ios-backspace" size={36} color="#3aa797" /> : undefined
                    }
                    customRightButton={
                        showCompletedButton ? (
                            <Icon
                                name="arrow-forward-outline"
                                size={36}
                                color="#3aa797"
                                onPress={() => checkPin() && checkHasPin() && clearPin()}
                            />
                        ) : undefined
                    }
                />
            </SafeAreaView>
        </>
    );
}

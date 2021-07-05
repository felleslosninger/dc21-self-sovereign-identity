import Icon from 'react-native-vector-icons/Ionicons';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StatusBar, Text } from 'react-native';
import ReactNativePinView from 'react-native-pin-view';
import { useNavigation } from '@react-navigation/native';

export default function Access() {
    const pinView = useRef(null);
    const [showRemoveButton, setShowRemoveButton] = useState(false);
    const [enteredPin, setEnteredPin] = useState('');
    const [showCompletedButton, setShowCompletedButton] = useState(false);

    const navigation = useNavigation();

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

    const checkPin = () => {
        if (enteredPin === '1234') {
            console.log(enteredPin);
            navigation.navigate('Oversikt');
        }
    };
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView
                style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
                <Text
                    style={{
                        paddingTop: 24,
                        paddingBottom: 48,
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: 48,
                    }}>
                    Logg inn
                </Text>
                <ReactNativePinView
                    inputSize={32}
                    ref={pinView}
                    pinLength={4}
                    buttonSize={60}
                    onValueChange={(value) => setEnteredPin(value)}
                    onButtonPress={(key) => {
                        if (key === 'custom_left') {
                            pinView.current.clear();
                        }
                        if (key === 'custom_right') {
                            console.log(enteredPin);
                            alert(`Entered Pin: ${enteredPin}`);
                        }
                    }}
                    customLeftButton={
                        showRemoveButton ? <Icon name="ios-backspace" size={36} color="#FFF" /> : undefined
                    }
                    customRightButton={
                        showCompletedButton ? (
                            <Icon name="arrow-forward-outline" size={36} color="#FFF" onPress={() => checkPin()} />
                        ) : undefined
                    }
                />
            </SafeAreaView>
        </>
    );
}

/*
import React from 'react';
import { SafeAreaView } from 'react-native';

import PINCode from '@haskkor/react-native-pincode';

// import { KeycodeInput } from 'react-native-keycode';

export default function Access() {
    return (
        <SafeAreaView>
            <PINCode status="choose" />
        </SafeAreaView>
    );

    
    return (
        <SafeAreaView>
            <KeycodeInput
                onComplete={(value) => {
                    alert(value);
                }}
            />
        </SafeAreaView>
    );
}
*/

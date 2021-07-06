import Icon from 'react-native-vector-icons/Ionicons';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StatusBar, Text } from 'react-native';
import ReactNativePinView from 'react-native-pin-view';
import { useDispatch } from 'react-redux';
import { signIn } from '../../redux/SignedInSlice';

export default function Access() {
    const pinView = useRef(null);
    const [showRemoveButton, setShowRemoveButton] = useState(false);
    const [enteredPin, setEnteredPin] = useState('');
    const [showCompletedButton, setShowCompletedButton] = useState(false);

    const dispatch = useDispatch();
    // const { signedIn } = useSelector((state) => state.signedInStatus);

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
            dispatch(signIn(true));
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

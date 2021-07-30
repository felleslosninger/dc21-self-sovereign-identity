import React from 'react';
import { Provider } from 'react-redux';
import { Colors } from 'react-native-ui-lib';
import store from './redux/configureStore';
import AppWrapper from './AppWrapper';

Colors.loadSchemes({
    light: {
        screenBG: 'transparent',
        textColor: Colors.yellow10,
        moonOrSun: Colors.yellow30,
        mountainForeground: Colors.green30,
        mountainBackground: Colors.green50,
    },
    dark: {
        screenBG: Colors.grey10,
        textColor: Colors.yellow10,
        moonOrSun: Colors.grey80,
        mountainForeground: Colors.violet10,
        mountainBackground: Colors.violet20,
    },
});

export default function App() {
    return (
        <Provider store={store}>
            <AppWrapper />
        </Provider>
    );
}

import React from 'react';
import { Provider } from 'react-redux';
import { LogBox } from 'react-native';
import store from './src/redux/configureStore';
import AppWrapper from './src/AppWrapper';

export default function App() {
    LogBox.ignoreAllLogs(true);
    return (
        <Provider store={store}>
            <AppWrapper />
        </Provider>
    );
}

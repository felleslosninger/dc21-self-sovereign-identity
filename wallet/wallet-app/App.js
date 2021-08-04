import React from 'react';
import { Provider, useSelector } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import store from './redux/configureStore';
import AppWrapper from './AppWrapper';

export default function App() {
    const { active } = useSelector((state) => state.spinnerStatus);

    return (
        <Provider store={store}>
            <Spinner visible={active} textContent="Vent litt..." textStyle={{ color: '#FFF' }} />
            <AppWrapper />
        </Provider>
    );
}

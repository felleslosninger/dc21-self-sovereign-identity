import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/configureStore';
import AppWrapper from './AppWrapper';

export default function App() {
    return (
        <Provider store={store}>
            <AppWrapper />
        </Provider>
    );
}

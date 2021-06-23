import React from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import TheRequests from '../../requestsex';
import Menu from '../Menu';

export default function ActivityFrame() {
    return(
        <SafeAreaView>
            <TheRequests></TheRequests>
            <Menu></Menu>
        </SafeAreaView>
    )
}
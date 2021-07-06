// import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

// import Test from './components/test'
// import { generateKeyPair, signing } from './utils/signing';
// import {sign} from './utils.sign';
// import { signDemo } from './utils/sign' ;
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RequestFrame from './components/frames/RequestFrame';
import ActivityFrame from './components/frames/ActivityFrame';
import ProofOverviewFrame from './components/frames/ProofOverviewFrame';
import VerifierLogFrame from './components/frames/VerifierLogFrame';
import Access from './components/frames/Access';

export default function AppWrapper() {
    const Stack = createStackNavigator();
    const Tab = createBottomTabNavigator();

    const OverviewStack = createStackNavigator();

    const { signedIn } = useSelector((state) => state.signedInStatus);

    function OverviewStackScreen() {
        return (
            <OverviewStack.Navigator
                screenOptions={{
                    headerShown: false,
                }}>
                <OverviewStack.Screen name="Oversikt" component={ProofOverviewFrame} />
                <OverviewStack.Screen name="Delt med" component={VerifierLogFrame} />
            </OverviewStack.Navigator>
        );
    }

    return (
        <NavigationContainer>
            {signedIn ? (
                <>
                    <Tab.Navigator>
                        <Tab.Screen name="Oversikt" component={OverviewStackScreen} />
                        <Tab.Screen name="Forespørsler" component={RequestFrame} />
                        <Tab.Screen name="Aktivitet" component={ActivityFrame} />
                    </Tab.Navigator>
                </>
            ) : (
                <Stack.Navigator>
                    <Stack.Screen name="Tilgang" component={Access} />
                </Stack.Navigator>
            )}
            {/* <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}>
                    <Stack.Screen name="Tilgang" component={Access} />
                    <Stack.Screen name="Oversikt" component={ProofOverviewFrame} />
                    <Stack.Screen name="Forespørsler" component={RequestFrame} />
                    <Stack.Screen name="Aktivitet" component={ActivityFrame} />
                    <Stack.Screen name="Delt med" component={VerifierLogFrame} />
                </Stack.Navigator> */}
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#87D7BF',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

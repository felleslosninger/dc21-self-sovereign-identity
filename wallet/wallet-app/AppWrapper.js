/* eslint-disable react/prop-types */
// import 'react-native-gesture-handler';
import React from 'react';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

// import Test from './components/test'
// import { generateKeyPair, signing } from './utils/signing';
// import {sign} from './utils.sign';
// import { signDemo } from './utils/sign' ;
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import RequestFrame from './components/frames/RequestFrame';
import ActivityFrame from './components/frames/ActivityFrame';
import ProofOverviewFrame from './components/frames/ProofOverviewFrame';
import VerifierLogFrame from './components/frames/VerifierLogFrame';
import Access from './components/frames/Access';
import ProfileMenuSlide from './components/frames/ProfileMenu';
import Onboarding from './components/frames/Onboarding';
import StartPage from './components/frames/StartPage';

export default function AppWrapper() {
    const Stack = createStackNavigator();
    const Tab = createBottomTabNavigator();

    const OverviewStack = createStackNavigator();
    const StartStack = createStackNavigator();

    const { signedIn } = useSelector((state) => state.signedInStatus);

    // ----------
    // Skip onboarding when launcing on web

    const exampleBaseVc =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIwODA4OTQwODA4NCIsImlzcyI6IkdydW5uSUQtcG9ydGFsZW4ubm85NDAxNWViYi0yMzBjLTQyMWQtOWMwZC1mNDE2NjEzNzQwNzgiLCJleHAiOjE2Mjc5MDU1MzMsImlhdCI6MTYyNjY5NTkzMywidmMiOnsiY3JlZGVudGlhbFN1YmplY3QiOnsiYmFzZWlkIjp7Im5hbWUiOiJCYXNlSUQiLCJ0eXBlIjoiQmFzZUlEIn19LCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiQmFzZUNyZWRlbnRpYWwiXSwiQGNvbnRleHQiOlsiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvdjEiXX0sImp0aSI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4My9jcmVkZW50aWFscy8xIn0.hNGmIyFzRIRm0dM0QX94umAt9egcN0mZ7zwVifAxsfMe7n4KQG5mtTRF7eDSecUicov24lskL09LhEDHGNY9EThjVOfh3cKoZd5g78qdARgpWnaXeFRDZ8Nx7mqUeKq1O4yiMcgc81pQJrH09lFfp-5PIj4KYSDLJxNFIuAOSonNpaiIHEJrwpqziWZhci15MBg7Zyu7xgD4-NWw6uc6lwDavCQ_CGB8tO2j-rMZuxHlwvjxgBVyXKTayPnPAUyiBE6xERt4NH9zTCMhSNua4nPlq4FqwFzbUEYpFbkw-UvJGSb7o0FhJqt0RP0Zdrv5Hs95tC0KP0-trNtViO7NAg';

    if (Platform.OS === 'web') {
        async () => {
            await AsyncStorage.setItem('pin', '1111');
            await AsyncStorage.setItem('baseId', exampleBaseVc);
        };
    }
    // ----------

    function OverviewStackScreen() {
        return (
            <OverviewStack.Navigator
                screenOptions={{
                    headerShown: false,
                }}>
                <OverviewStack.Screen name="Oversikt" component={ProofOverviewFrame} />
                <OverviewStack.Screen name="Delt med" component={VerifierLogFrame} />
                <OverviewStack.Screen name="Profil" component={ProfileMenuSlide} />
            </OverviewStack.Navigator>
        );
    }

    function StartStackScreen() {
        return (
            <StartStack.Navigator>
                <StartStack.Screen name="Start" component={StartPage} />
                <StartStack.Screen name="Opprett bruker" component={Onboarding} />
                <StartStack.Screen name="Adgangskontroll" component={Access} />
            </StartStack.Navigator>
        );
    }

    return (
        <NavigationContainer>
            {signedIn ? (
                <>
                    <Tab.Navigator
                        screenOptions={({ route }) => ({
                            tabBarIcon: ({ color, size }) => {
                                let iconName;

                                if (route.name === 'Oversikt') {
                                    iconName = 'vcard';
                                } else if (route.name === 'Forespørsler') {
                                    iconName = 'plus';
                                } else if (route.name === 'Aktivitet') {
                                    iconName = 'qrcode';
                                } else if (route.name === 'Profil') {
                                    iconName = 'id-badge';
                                }

                                // You can return any component that you like here!
                                return <Icon name={iconName} size={size} color={color} />;
                            },
                        })}
                        tabBarOptions={{
                            activeBackgroundColor: '#3aa797',
                            inactiveBackgroundColor: '#3aa797',
                            activeTintColor: 'white',
                            inactiveTintColor: '#1E2B3C',
                        }}>
                        <Tab.Screen name="Oversikt" component={OverviewStackScreen} />
                        <Tab.Screen name="Forespørsler" component={RequestFrame} />
                        <Tab.Screen name="Aktivitet" component={ActivityFrame} />
                        <Tab.Screen name="Profil" component={ProfileMenuSlide} />
                    </Tab.Navigator>
                </>
            ) : (
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}>
                    <Stack.Screen name="Start" component={StartStackScreen} />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
}

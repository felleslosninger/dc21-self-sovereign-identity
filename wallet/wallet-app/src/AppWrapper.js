/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import RequestFrame from './components/frames/RequestFrame';
import VerifyFrame from './components/frames/VerifyFrame';
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
                                } else if (route.name === 'Hent bevis') {
                                    iconName = 'plus';
                                } else if (route.name === 'Skann QR') {
                                    iconName = 'qrcode';
                                } else if (route.name === 'Profil') {
                                    iconName = 'id-badge';
                                }

                                // You can return any component that you like here!
                                return <Icon style={{ paddingTop: 8 }} name={iconName} size={size} color={color} />;
                            },
                        })}
                        tabBarOptions={{
                            activeBackgroundColor: 'white',
                            inactiveBackgroundColor: 'white',
                            activeTintColor: 'rgb(0,98,184)',
                            inactiveTintColor: 'rgb(30,46,60)',
                            style: { height: 85 },
                            labelStyle: {
                                fontSize: 10,
                                paddingBottom: 7,
                            },
                        }}>
                        <Tab.Screen style={styles.textNavBar} name="Oversikt" component={OverviewStackScreen} />
                        <Tab.Screen name="Hent bevis" component={RequestFrame} />
                        <Tab.Screen name="Skann QR" component={VerifyFrame} />
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
const styles = StyleSheet.create({
    textNavBar: {
        padding: 10,
        fontSize: 50,
    },
});

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
                    </Tab.Navigator>
                </>
            ) : (
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}>
                    <Stack.Screen name="Tilgang" component={Access} />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
}
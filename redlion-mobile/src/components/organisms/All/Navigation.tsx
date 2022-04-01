import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { API_URL } from '@env';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import VARIABLES from '../../../../assets/styles/_variables';

import UserNavigation from '../../pages/User/UserNavigation';
import ProjectNavigation from '../../pages/Project/ProjectNavigation';
import ProfilNavigation from '../../pages/Profil/ProfilNavigation';
import { DarkTheme } from 'react-native-paper';

const client = new ApolloClient({
    uri: API_URL,
    cache: new InMemoryCache(),
});

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
    navigation: {
      display: 'flex',
      flex: 1,
      backgroundColor: VARIABLES.clrBgDark,
    },
})

export default function Navigation() {
    return (
        <View style={styles.navigation}>
            <ApolloProvider client={client}>
                <NavigationContainer theme={DarkTheme}>
                    <Tab.Navigator
                        screenOptions={({ route }) => ({
                            headerShown: false,
                            tabBarStyle: {
                                backgroundColor: VARIABLES.clrBgDark,
                                borderTopColor: VARIABLES.clrThrd
                            },
                            tabBarIcon: ({ focused, color, size }) => {
                                let iconName;

                                if (route.name === 'UserNavigation') {
                                    iconName = focused ? 'home' : 'home-outline';
                                } else if (route.name === 'ProjectNavigation') {
                                    iconName = focused ? 'clipboard' : 'clipboard-outline';
                                } else if (route.name === 'ProfilNavigation') {
                                    iconName = focused ? 'person' : 'person-outline';
                                }

                                return <Ionicons name={iconName} size={size} color={color} />;
                            },
                            tabBarShowLabel: false,
                            tabBarActiveTintColor: VARIABLES.clrThrd,
                            tabBarInactiveTintColor: VARIABLES.clrWhite,
                        })}
                    >
                        <Tab.Group>
                            <Tab.Screen name="UserNavigation" component={UserNavigation} />
                            <Tab.Screen name="ProjectNavigation" component={ProjectNavigation} />
                            <Tab.Screen name="ProfilNavigation" component={ProfilNavigation} />
                        </Tab.Group>
                    </Tab.Navigator>
                </NavigationContainer>
            </ApolloProvider>
        </View>
    )
}


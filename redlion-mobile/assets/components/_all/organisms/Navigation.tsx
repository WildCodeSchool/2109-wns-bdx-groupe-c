import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { API_URL } from '@env';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import VARIABLES from '../../../styles/_variables';

import UserDashboard from '../../../../src/main-screens/UserDashboard';
import ProjectDashboard from '../../../../src/main-screens/ProjectDashboard';
import UserProfil from '../../../../src/main-screens/UserProfil';

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
                <NavigationContainer>
                    <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarStyle: {
                        backgroundColor: VARIABLES.clrBgDark,
                        borderTopColor: VARIABLES.clrThrd
                        },
                        headerStyle: {
                            backgroundColor: VARIABLES.clrBgDark,
                        },
                        headerTitleStyle: {
                            color: VARIABLES.clrWhite,
                        },
                        tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'UserDashboard') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'ProjectDashboard') {
                            iconName = focused ? 'clipboard' : 'clipboard-outline';
                        } else if (route.name === 'UserProfil') {
                            iconName = focused ? 'person' : 'person-outline';
                        } else if (route.name === 'Tasks') {
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
                            <Tab.Screen name="UserDashboard" component={UserDashboard} />
                            <Tab.Screen name="ProjectDashboard" component={ProjectDashboard} />
                            <Tab.Screen name="UserProfil" component={UserProfil} />
                        </Tab.Group>
                    </Tab.Navigator>
                </NavigationContainer>
            </ApolloProvider>
        </View>
    )
}


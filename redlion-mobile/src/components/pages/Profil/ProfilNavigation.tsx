import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

import Profil from './Profil';
import ProfilInformations from './ProfilInformations';
import ProfilStatistiques from './ProfilStatistiques';
import ProfilSettings from './ProfilSettings';

import VARIABLES from '../../../../assets/styles/_variables';
import COMPONENTS from '../../../../assets/styles/_components';

export default function ProfilNavigation() {
    
    const Stack = createStackNavigator();

    const styles = StyleSheet.create({
        profilContainer: {
            flex: 1,
            backgroundColor: VARIABLES.clrBgDark,
        }
    })

    const forFade = ({ current }) => ({
        cardStyle: {
            opacity: current.progress,
        },
    });

    return (
        <Stack.Navigator
            initialRouteName="Profil"
            screenOptions={() => ({
                headerStyle: {
                    backgroundColor: VARIABLES.clrBgDark, 
                },
                headerTintColor: VARIABLES.clrWhite,
                cardStyle: {
                    backgroundColor: VARIABLES.clrBgDark,
                },
            })}
        >
            <Stack.Screen
                name="ProfilMain"
                component={Profil}
                options={{
                    cardStyle: styles.profilContainer,
                    headerTitle: 'Profil',
                    cardStyleInterpolator: forFade,
                }}
            />
            <Stack.Screen
                name="ProfilInformations"
                component={ProfilInformations}
                options={{
                    cardStyle: styles.profilContainer,
                    headerTitle: 'Informations',
                    cardStyleInterpolator: forFade,
                }}
            />
            <Stack.Screen
                name="ProfilStatistiques"
                component={ProfilStatistiques}
                options={{
                    cardStyle: styles.profilContainer,
                    headerTitle: 'Statistiques',
                    cardStyleInterpolator: forFade,
                }}
            />
            <Stack.Screen
                name="ProfilSettings"
                component={ProfilSettings}
                options={{
                    cardStyle: styles.profilContainer,
                    headerTitle: 'Settings',
                    cardStyleInterpolator: forFade,
            }}
            />
        </Stack.Navigator>
    )
}
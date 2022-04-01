import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

import VARIABLES from '../../../../assets/styles/_variables';

const styles = StyleSheet.create({
    profilNavigation: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: VARIABLES.clrBgDark,
    },
    profilNavigationButton: {
        marginVertical: 10,
        borderWidth: 1,
        borderColor: VARIABLES.clrTag4,
        borderRadius: 18,
    },
    profilNavigationButtonContent: {
        width: VARIABLES.windowWidth - 20,
        height: 80,
    },
    profilNavigationIcon: {
        fontSize: 30,
    },
    profilNavigationText: {
        fontSize: 14,
    },
})

export default function Profil() {
    
    const navigation = useNavigation();

    return (
        <View style={styles.profilNavigation}>
            <Button 
                icon={() => (<Ionicons name={'alert-circle'} style={[styles.profilNavigationIcon, {color: VARIABLES.clrTag4}]}/>)}
                color={VARIABLES.clrTag4}
                style={[styles.profilNavigationButton, {borderColor: VARIABLES.clrTag4}]}
                contentStyle={styles.profilNavigationButtonContent}
                onPress={() => {navigation.navigate('ProfilInformations')}} 
            >
                <Text style={[styles.profilNavigationText, {color: VARIABLES.clrTag4}]}>Informations</Text>
            </Button>
            
            <Button 
                icon={() => (<Ionicons name={'analytics'} style={[styles.profilNavigationIcon, {color: VARIABLES.clrTag2}]}/>)}
                color={VARIABLES.clrTag2}
                style={[styles.profilNavigationButton, {borderColor: VARIABLES.clrTag2}]}
                contentStyle={styles.profilNavigationButtonContent}
                onPress={() => {navigation.navigate('ProfilStatistiques')} }
            >
                <Text style={[styles.profilNavigationText, {color: VARIABLES.clrTag2}]}>Statistiques</Text>
            </Button>

            <Button 
                icon={() => (<Ionicons name={'settings'} style={[styles.profilNavigationIcon, {color: VARIABLES.clrTag3}]}/>)}
                color={VARIABLES.clrTag3}
                style={[styles.profilNavigationButton, {borderColor: VARIABLES.clrTag3}]}
                contentStyle={styles.profilNavigationButtonContent}
                onPress={() => {navigation.navigate('ProfilSettings')} }
            >
                <Text style={[styles.profilNavigationText, {color: VARIABLES.clrTag3}]}>Settings</Text>
            </Button>
        </View>
    )
}

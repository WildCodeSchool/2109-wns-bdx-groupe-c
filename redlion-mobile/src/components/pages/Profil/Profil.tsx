import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import VARIABLES from '../../../../assets/styles/_variables';

import ButtonLarge from '../../molecules/ButtonLarge';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: VARIABLES.clrBgDark,
    },
    buttonIcon: {
        fontSize: 30,
    },
})

export default function Profil(route: any) {
    
    const navigation = useNavigation();

    return (
        <View style={styles.container}>

            <ButtonLarge props={{
                myColor: VARIABLES.clrTag4,
                text: 'Informations',
                icon: () => (<Ionicons name={'alert-circle'} style={[styles.buttonIcon, {color: VARIABLES.clrTag4}]} />),
                function: () => {navigation.navigate('ProfilInformations')},
            }}/>
 
            <ButtonLarge props={{
                myColor: VARIABLES.clrTag2,
                text: 'Statistiques',
                icon: () => (<Ionicons name={'analytics'} style={[styles.buttonIcon, {color: VARIABLES.clrTag2}]} />),
                function: () => {navigation.navigate('ProfilStatistiques')},
            }}/>

        </View>
    )
}

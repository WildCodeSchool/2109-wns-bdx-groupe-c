import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import VARIABLES from '../../../../assets/styles/_variables';

const styles = StyleSheet.create({
    profilInformationsContainer: {
        padding: 10,
    }
})

export default function ProfilInformations() {
    return (
        <View style={styles.profilInformationsContainer}>
            <Text style={{color: VARIABLES.clrWhite}}>La page de gestion des informations de l'utilisateur</Text>
        </View>
    )
}

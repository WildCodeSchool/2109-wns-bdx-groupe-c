import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import VARIABLES from '../../../../assets/styles/_variables';

const styles = StyleSheet.create({
    profilSettingsContainer: {
        padding: 10,
    }
})

export default function ProfilSettings() {
    return (
        <View style={styles.profilSettingsContainer}>
            <Text style={{color: VARIABLES.clrWhite}}>La page de gestion des informations de l'utilisateur</Text>
        </View>
    )
}

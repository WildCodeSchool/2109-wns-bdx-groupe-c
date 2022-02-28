import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import VARIABLES from '../../assets/styles/_variables';

const styles = StyleSheet.create({
    userContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: VARIABLES.clrBgDark,
    },
    userCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: VARIABLES.windowWidth - 20,
        marginVertical: 10,
        padding: 20,
        borderWidth: 1,
        borderColor: VARIABLES.clrTag4,
        borderRadius: 18,
    },
    userCardInformations: {
        borderColor: VARIABLES.clrTag4,
    },
    userCardStats: {
        borderColor: VARIABLES.clrTag2,
    },
    userCardSettings: {
        borderColor: VARIABLES.clrTag3,
    },
    userCardIcon: {
        marginRight: 20,
        fontSize: 38,
    },

})

export default function UserProfil () {

    return (
        <View style={styles.userContainer}>
            <View style={[styles.userCard, styles.userCardInformations]}>
                <Ionicons name={'information-circle'} style={styles.userCardIcon} color={VARIABLES.clrTag4} />
                <Text style={{color: VARIABLES.clrTag4}}>Informations</Text>
            </View>
            <View style={[styles.userCard, styles.userCardStats]}>
                <Ionicons name={'analytics'} style={styles.userCardIcon} color={VARIABLES.clrTag2} />
                <Text style={{color: VARIABLES.clrTag2}}>Stats</Text>
            </View>
            <View style={[styles.userCard, styles.userCardSettings]}>
                <Ionicons name={'settings'} style={styles.userCardIcon} color={VARIABLES.clrTag3}  />
                <Text style={{color: VARIABLES.clrTag3}}>Settings</Text>
            </View>
        </View>
    )
}
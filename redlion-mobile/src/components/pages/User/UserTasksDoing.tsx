import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import VARIABLES from '../../../../assets/styles/_variables';

const styles = StyleSheet.create({
    userTasks: {
        padding: 10,
    }
})

export default function UserTasks() {
    return (
        <View style={styles.userTasks}>
            <Text style={{color: VARIABLES.clrWhite}}>Page des tâches en cours de l'utilisateur</Text>
        </View>
    )
}

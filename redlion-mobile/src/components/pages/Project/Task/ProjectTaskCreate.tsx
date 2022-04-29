import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import VARIABLES from '../../../../../assets/styles/_variables';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    text: {
        color: VARIABLES.clrWhite,
    },
})

export default function ProjectTaskCreate() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Page pour créer une tâche</Text>
        </View>
    )
}

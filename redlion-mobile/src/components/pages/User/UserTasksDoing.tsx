import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import VARIABLES from '../../../../assets/styles/_variables';

const styles = StyleSheet.create({
    userTasks: {

    }
})

export default function UserTasks() {
    return (
        <View style={styles.userTasks}>
            <Text>Page des tâches de l'utilisateur</Text>
        </View>
    )
}

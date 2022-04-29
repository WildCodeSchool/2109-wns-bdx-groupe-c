import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';

import VARIABLES from '../../../../assets/styles/_variables';

import ButtonLarge from '../../molecules/ButtonLarge';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 10,
    },
})

export default function ProfilSettings() {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>

            <ButtonLarge props={{
                myColor: VARIABLES.clrTag1,
                text: 'Change email',
                function: () => {},
            }}/>

            <ButtonLarge props={{
                myColor: VARIABLES.clrTag4,
                text: 'Change password',
                function: () => {},
            }}/>

            <ButtonLarge props={{
                myColor: VARIABLES.clrCancel,
                text: 'Delete profil',
                function: () => {},
            }}/>

        </View>
    )
}

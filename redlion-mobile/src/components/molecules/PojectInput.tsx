import * as React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

import VARIABLES from '../../../assets/styles/_variables';

const styles = StyleSheet.create({
    input: {
        flexWrap: 'wrap',
        height: 60,
        maxHeight: 60,
        minWidth: '100%',
        maxWidth: '100%',
        marginBottom: 20,
        backgroundColor: VARIABLES.clrBgDark,
        borderRadius: 18,
    },
})

export default function ProjectInput ({props}) {
    return (
        <TextInput
            mode='outlined'
            style={[
                styles.input,
                props.height != undefined ? {maxHeight: props.height, height: props.height} : {},
            ]}
            theme={{
                colors: {
                    placeholder: VARIABLES.clrThrd,
                    text: VARIABLES.clrWhite},
                    roundness: 12
                }
            }
            underlineColor={VARIABLES.clrThrd}
            placeholderTextColor={VARIABLES.clrWhite}
            activeUnderlineColor={VARIABLES.clrWhite}
            activeOutlineColor={VARIABLES.clrThrd}
            multiline={true}
            autoComplete={true}
            value={props.value == '' ? props.project : props.value}
            label={props.label}
            onChangeText={props.setInputText}
      />
    )
}

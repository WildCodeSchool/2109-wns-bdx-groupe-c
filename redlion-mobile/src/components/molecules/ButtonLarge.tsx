import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';

import VARIABLES from '../../../assets/styles/_variables';

const styles = StyleSheet.create({
    buttonLarge: {
        marginVertical: 10,
        borderWidth: 1,
        borderColor: VARIABLES.clrTag4,
        borderRadius: 18,
    },
    buttonLargeContent: {
        width: VARIABLES.windowWidth - 20,
        height: 80,
    },
    buttonLargeText: {
        fontSize: 14,
    },
});

export default function ButtonLarge (props: any) {
    return (
        <Button 
            icon={props.props.icon}
            color={props.props.myColor}
            style={[styles.buttonLarge, {borderColor: props.props.myColor}]}
            contentStyle={styles.buttonLargeContent}
            onPress={props.props.function} 
        >
            <Text style={[styles.buttonLargeText, {color: props.myColor}]}>{props.props.text}</Text>
        </Button>
    )
}

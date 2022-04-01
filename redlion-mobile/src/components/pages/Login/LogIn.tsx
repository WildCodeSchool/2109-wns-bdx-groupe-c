import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import VARIABLES from '../../../../assets/styles/_variables';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        flexDirection: 'column',
        backgroundColor: VARIABLES.clrBgDark,
    },
    block: {
        flexDirection: 'column',
        alignItems: 'center',
        width: VARIABLES.windowWidth - 20,
        marginTop: 60,
        marginBottom: 20,
    },
    blockTitle: {
        flexDirection: 'row',
        marginVertical: 20,
    },
    title: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 25,
        color: VARIABLES.clrWhite,
    },
    titleRed: {
        marginRight: 5,
        backgroundColor: 'red',
    },
    titleText: {
        fontSize: 20,
        color: VARIABLES.clrWhite,
    },
    text: {
        color: VARIABLES.clrWhite,
    },
    input: {
        height: 50,
        maxHeight: 50,
        minWidth: '70%',
        marginBottom: 20,
        backgroundColor: 'transparent',
        color: 'red',
    },
    button: {
        marginVertical: 40,
    },
    buttonContent: {
        backgroundColor: VARIABLES.clrThrd,
    },
})

export default function LogIn () {

    const navigation = useNavigation();

    const [text, setText] = React.useState("");

    const theme = {
        colors: {
          text: "orange",
          placeHolder: 'orange'
        }
      };

    return (
        <View style={styles.container}>

            <View style={styles.block}>
                <View style={styles.blockTitle}>
                    <Text style={[styles.title, styles.titleRed]}>Red</Text>
                    <Text style={[styles.title]}>Lion</Text>
                </View>
                <Text style={styles.titleText}>"Think kion, not kitty"</Text>
            </View>

            <View style={[styles.block]}>
                <TextInput
                    style={[styles.input]}
                    theme={{colors: {placeholder: VARIABLES.clrWhite}}}
                    underlineColor={VARIABLES.clrWhite}
                    placeholderTextColor={VARIABLES.clrThrd}
                    activeUnderlineColor={VARIABLES.clrThrd}
                    selectionColor={VARIABLES.clrThrd}
                    label="Login"
                    value={text}
                    autoComplete={true}
                    onChangeText={text => setText(text)}
                    />
                <TextInput
                    style={[styles.input]}
                    theme={{colors: {placeholder: VARIABLES.clrWhite}}}
                    underlineColor={VARIABLES.clrWhite}
                    placeholderTextColor={VARIABLES.clrThrd}
                    activeUnderlineColor={VARIABLES.clrThrd}
                    selectionColor={VARIABLES.clrThrd}
                    label="Password"
                    value={text}
                    autoComplete={true}
                    onChangeText={text => setText(text)}
                />
                <Button
                    style={styles.button}
                    contentStyle={styles.buttonContent}
                    color={VARIABLES.clrWhite}
                    onPress={() => {navigation.navigate('UserNavigation')}}
                >
                    Connection
                </Button>
            </View>

        </View>
    )
}


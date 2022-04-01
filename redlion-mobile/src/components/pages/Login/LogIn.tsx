import { useNavigation } from '@react-navigation/native';
import {useState, useCallback} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput, HelperText } from 'react-native-paper';
import ApiUtils from '../../../utils/ApiUtils';

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

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleClick = useCallback(async () => {
        const onLoginSuccess = await ApiUtils.signIn(email, password);
        if (onLoginSuccess) {
            setError(false);
            navigation.navigate('UserNavigation');

        } else {
            setError(true);
        }
    }, [error, email, password]);

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
                    label="Email"
                    value={email}
                    autoComplete={true}
                    onChangeText={text => setEmail(text)}
                    />
                <TextInput
                    style={[styles.input]}
                    theme={{colors: {placeholder: VARIABLES.clrWhite}}}
                    underlineColor={VARIABLES.clrWhite}
                    placeholderTextColor={VARIABLES.clrThrd}
                    activeUnderlineColor={VARIABLES.clrThrd}
                    selectionColor={VARIABLES.clrThrd}
                    label="Password"
                    value={password}
                    autoComplete={true}
                    onChangeText={text => setPassword(text)}
                />
                <HelperText type="error" visible={error}>
                    Could not sign up with provided email address.
                </HelperText>
                <Button
                    style={styles.button}
                    contentStyle={styles.buttonContent}
                    color={VARIABLES.clrWhite}
                    onPress={handleClick}
                >
                    Connection
                </Button>
            </View>

        </View>
    )
}


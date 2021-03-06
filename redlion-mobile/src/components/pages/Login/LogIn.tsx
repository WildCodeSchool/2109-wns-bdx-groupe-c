import { useNavigation } from '@react-navigation/native';
import {useState, useCallback} from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
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
    image: {
        height: 40,
        width: '80%',
        resizeMode: 'contain'
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
        height: 60,
        maxHeight: 60,
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
    }, [
        setError,
        email,
        password,
        navigation
    ]);

    return (
        <View style={styles.container}>

            <View style={styles.block}>
                <View style={styles.blockTitle}>
                    <Image style={styles.image} source={require('../../../../assets/images/logo.png')} />
                </View>
                <Text style={styles.titleText}>" Think lion, not kitty "</Text>
            </View>

            <View style={[styles.block]}>
                <TextInput
                    style={[styles.input]}
                    theme={{colors: {placeholder: VARIABLES.clrWhite, text: VARIABLES.clrWhite}}}
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
                    theme={{colors: {placeholder: VARIABLES.clrWhite, text: VARIABLES.clrWhite}}}
                    underlineColor={VARIABLES.clrWhite}
                    placeholderTextColor={VARIABLES.clrThrd}
                    activeUnderlineColor={VARIABLES.clrThrd}
                    selectionColor={VARIABLES.clrThrd}
                    label="Password"
                    value={password}
                    autoComplete={true}
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                />
                <HelperText type="error" visible={error} onPressIn={()=>{}} onPressOut={()=>{}}>
                    Could not sign in with provided email address or password
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


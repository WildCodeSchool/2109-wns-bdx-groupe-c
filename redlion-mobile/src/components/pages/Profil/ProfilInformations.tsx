import { useMemo } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import VARIABLES from '../../../../assets/styles/_variables';
import useMyProfile from '../../customHook/useMyProfile';

const styles = StyleSheet.create({
    profilInformationsContainer: {
        padding: 10,
    },
    profilInformationsBlock: {
        borderWidth: 1,
        borderColor: VARIABLES.clrThrd,
        borderRadius: 12,
        padding: 10,
        marginBottom: 10,
    },
    profilInformationsTitle: {
        marginBottom: 5,
        color: VARIABLES.clrThrd,
    }
})

export default function ProfilInformations() {

    const [user, loading] = useMyProfile()

    const firstName = useMemo(() => {
        if (user && typeof user !== 'boolean') {
            return user.firstName;
        }
        return '';
    }, [user])

    const lastName = useMemo(() => {
        if (user && typeof user !== 'boolean') {
            return user.lastName;
        }
        return '';
    }, [user])

    const email = useMemo(() => {
        if (user && typeof user !== 'boolean') {
            return user.email;
        }
        return '';
    }, [user])

    const role = useMemo(() => {
        if (user && typeof user !== 'boolean') {
            return user.role.name;
        }
        return '';
    }, [user])

    return (

        <View style={styles.profilInformationsContainer}>
            {loading ? <ActivityIndicator /> : null}
            {!loading && user &&
                <>
                    <View style={styles.profilInformationsBlock}>
                        <Text style={styles.profilInformationsTitle}>{firstName}</Text>
                        <Text style={styles.profilInformationsTitle}>{lastName}</Text>
                        <Text style={styles.profilInformationsTitle}>{email}</Text>
                        <Text style={styles.profilInformationsTitle}>{role}</Text>
                    </View>
                </>
            }
        </View>
    )
}

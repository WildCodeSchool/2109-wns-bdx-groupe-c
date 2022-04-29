import * as React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useQuery } from '@apollo/client';

import { User as UserType } from "../../../schemaTypes";
import { GET_USER, GET_USER_PROFIL } from '../../../queries/user';

import ProjectInput from '../../molecules/PojectInput';

import VARIABLES from '../../../../assets/styles/_variables';

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

export default function ProfilInformations({ userId = '1'}) {

    /*
    const allQueries = () => {
        const userProfilQuery = useQuery(GET_USER_PROFIL);


        
        const userQuery = useQuery<UserType>(GET_USER, {
            variables: {userId: parseInt(userId)},
        });

        return [userProfilQuery, userQuery];
    }
    */

    /*
    const [
        {loading: loading1, data: data1},
        {loading: loading2, data: data2},
    ] = allQueries();
    */

    const { loading, data, error } = useQuery(GET_USER_PROFIL)
    console.log('***************error MY PROFLE ********************** :', error);
    console.log('*********** data MY PROFILE **************** :', data ? data.myProfile : 'PAS DE REPONSE');

    const [inputFirstname, setInputFirstname] = React.useState("");
    const [inputLastname, setInputLastname] = React.useState("");

    const loading2 = true;
    const data2 = {};

    return (
        
        <View style={styles.profilInformationsContainer}>
            {loading2 ? <ActivityIndicator /> : null}
            {data2 &&
                <>
                    {/* <ProjectInput props={{
                        label: 'Firstname',
                        project: data2.user.firstName,
                        value: inputFirstname,
                        setInputText: inputFirstname => setInputFirstname(inputFirstname),
                    }}/>

                    <ProjectInput props={{
                        label: 'Lastname',
                        project: data2.user.lastName,
                        value: inputLastname,
                        setInputText: inputLastname => setInputLastname(inputLastname),
                    }}/> */}

                    {/* <View style={styles.profilInformationsBlock}>
                        <Text style={styles.profilInformationsTitle}>Regsitered since :</Text>
                        <Text style={{color: VARIABLES.clrWhite}}>{data2.user.createdAt}</Text>
                    </View>  */}
                </>
            }
        </View>
    )
}

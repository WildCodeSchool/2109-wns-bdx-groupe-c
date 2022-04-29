import * as React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useQuery } from '@apollo/client';

import { Projects_projects, Tasks_tasks } from "../../../schemaTypes";
import { GET_USER_COMMENTS } from '../../../queries/user';
import { GET_TASKS_BY_STATUS_AND_USER } from '../../../queries/task';
import { GET_PROJECTS_BY_STATUS_AND_USER } from '../../../queries/project';

import VARIABLES from '../../../../assets/styles/_variables';

const styles = StyleSheet.create({
    profilStatistiquesContainer: {
        padding: 10,
    },
    profilStatistiquesBlock: {
        borderWidth: 1,
        borderColor: VARIABLES.clrThrd,
        borderRadius: 12,
        padding: 10,
        marginBottom: 10,
    },
    profilStatistiquesElement: {
        flexDirection: 'row',
        marginVertical: 5,
    },
    profilStatistiquesTitle: {
        marginRight: 10,
        color: VARIABLES.clrThrd,
    }
})

export default function ProfilStatistiques() {


    const allQueries = (userId: Number) => {

        const queryCompletedProjects = useQuery<Projects_projects>(GET_PROJECTS_BY_STATUS_AND_USER, {
            variables: { userId, statusName: 'Done' },
        });

        const queryInProgressProjects = useQuery<Projects_projects>(GET_PROJECTS_BY_STATUS_AND_USER, {
            variables: { userId, statusName: 'In Progress' },
        });

        const queryCompletedTasks = useQuery<Tasks_tasks>(GET_TASKS_BY_STATUS_AND_USER, {
            variables: { userId, statusName: 'Done' },
        });

        const queryInProgressTasks = useQuery<Tasks_tasks>(GET_TASKS_BY_STATUS_AND_USER, {
            variables: { userId, statusName: 'In Progress' },
        });

        const queryPublishedComments = useQuery(GET_USER_COMMENTS, {variables: { userId }});

        return [
            queryCompletedProjects, queryInProgressProjects,
            queryCompletedTasks, queryInProgressTasks, queryPublishedComments,
        ];
    }

    const [
        { loading: loading1, data: data1 },
        { loading: loading2, data: data2 },
        { loading: loading3, data: data3 },
        { loading: loading4, data: data4 },
        { loading: loading5, data: data5 },
    ] = allQueries(3)

    return (
        <View style={styles.profilStatistiquesContainer}>
            <View style={styles.profilStatistiquesBlock}>
                {loading1 ? <ActivityIndicator /> : null}
                {data1 &&
                    <View style={styles.profilStatistiquesElement}>
                            <Text style={styles.profilStatistiquesTitle}>Completed projects :</Text>
                            <Text style={{color: VARIABLES.clrWhite}}>{data1.myProjects.length}</Text>
                    </View> 
                }   
                {loading2 ? <ActivityIndicator /> : null}
                {data2 &&
                    <View style={styles.profilStatistiquesElement}>
                            <Text style={styles.profilStatistiquesTitle}>In progress projects  :</Text>
                            <Text style={{color: VARIABLES.clrWhite}}>{data2.myProjects.length}</Text>
                    </View> 
                }
            </View>

            <View style={styles.profilStatistiquesBlock}>
                {loading3 ? <ActivityIndicator /> : null}
                {data3 &&
                    <View style={styles.profilStatistiquesElement}>
                        <Text style={styles.profilStatistiquesTitle}>Completed tasks :</Text>
                        <Text style={{color: VARIABLES.clrWhite}}>{data3.myTasks.length}</Text>
                    </View> 
                }
                {loading4 ? <ActivityIndicator /> : null}
                {data4 &&
                    <View style={styles.profilStatistiquesElement}>
                        <Text style={styles.profilStatistiquesTitle}>In progress tasks :</Text>
                        <Text style={{color: VARIABLES.clrWhite}}>{data4.myTasks.length}</Text>
                    </View> 
                }
            </View>

            {loading5 ? <ActivityIndicator /> : null}
            {data5 &&
                <View style={styles.profilStatistiquesBlock}>
                    <View style={styles.profilStatistiquesElement}>
                        <Text style={styles.profilStatistiquesTitle}>Published comments :</Text>
                        <Text style={{color: VARIABLES.clrWhite}}>{data5.user.comments.length}</Text>
                    </View>
                </View> 
            }

        </View>
    )
}

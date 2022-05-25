import * as React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import useMyProjectsByStatus from '../../customHook/userMyProjectsByStatus';
import useMyTasks from '../../customHook/userMyTasks';

import VARIABLES from '../../../../assets/styles/_variables';
import useMyProfile from '../../customHook/useMyProfile';

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

export default function ProfilStatistiques(userId: Number) {

    const [projectsDone, loadingProjectsDone] = useMyProjectsByStatus('Done');
    const myProjectsDone = React.useMemo(() => {
        if (projectsDone && typeof projectsDone !== 'boolean') {
            return projectsDone;
        }
        return '';
    }, [projectsDone])


    const [projectsInProgress, loadingProjectsInProgress] = useMyProjectsByStatus('Done');
    const myProjectsInProgress = React.useMemo(() => {
        if (projectsInProgress && typeof projectsInProgress !== 'boolean') {
            return projectsInProgress;
        }
        return '';
    }, [projectsInProgress])


    const [tasksDone, loadingTasksDone] = useMyTasks('Done');
    const myTasksDone = React.useMemo(() => {
        if (tasksDone && typeof tasksDone !== 'boolean') {
            return tasksDone;
        }
        return '';
    }, [tasksDone])


    const [tasksInProgress, loadingTasksInProgress] = useMyTasks('Done');
    const myTasksInProgress = React.useMemo(() => {
        if (tasksInProgress && typeof tasksInProgress !== 'boolean') {
            return tasksInProgress;
        }
        return '';
    }, [tasksInProgress])

    
    const [user, loadingComments] = useMyProfile();
    const myUser = React.useMemo(() => {
        if (user && typeof user !== 'boolean') {
            return user;
        }
        return '';
    }, [user])

    return (
        <View style={styles.profilStatistiquesContainer}>
            <View style={styles.profilStatistiquesBlock}>
                {loadingProjectsDone ? <ActivityIndicator /> : null}
                {projectsDone &&
                    <View style={styles.profilStatistiquesElement}>
                            <Text style={styles.profilStatistiquesTitle}>Completed projects :</Text>
                            <Text style={{color: VARIABLES.clrWhite}}>{myProjectsDone.length}</Text>
                    </View> 
                }   
                {loadingProjectsInProgress ? <ActivityIndicator /> : null}
                {projectsInProgress &&
                    <View style={styles.profilStatistiquesElement}>
                            <Text style={styles.profilStatistiquesTitle}>In progress projects  :</Text>
                            <Text style={{color: VARIABLES.clrWhite}}>{myProjectsInProgress.length}</Text>
                    </View> 
                }
            </View>

            <View style={styles.profilStatistiquesBlock}>
                {loadingTasksDone ? <ActivityIndicator /> : null}
                {tasksDone &&
                    <View style={styles.profilStatistiquesElement}>
                        <Text style={styles.profilStatistiquesTitle}>Completed tasks :</Text>
                        <Text style={{color: VARIABLES.clrWhite}}>{myTasksDone.length}</Text>
                    </View> 
                }
                {loadingTasksInProgress ? <ActivityIndicator /> : null}
                {tasksInProgress &&
                    <View style={styles.profilStatistiquesElement}>
                        <Text style={styles.profilStatistiquesTitle}>In progress tasks :</Text>
                        <Text style={{color: VARIABLES.clrWhite}}>{myTasksInProgress.length}</Text>
                    </View> 
                }
            </View>

            {loadingComments ? <ActivityIndicator /> : null}
            {user &&
                <View style={styles.profilStatistiquesBlock}>
                    <View style={styles.profilStatistiquesElement}>
                        <Text style={styles.profilStatistiquesTitle}>Published comments :</Text>
                        <Text style={{color: VARIABLES.clrWhite}}>
                            {myUser.comments !== null ? myUser.comments.length : 0}
                        </Text>
                    </View>
                </View> 
            }

        </View>
    )
}

import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

import VARIABLES from '../../../../assets/styles/_variables';

const styles = StyleSheet.create({
    item: {
        fontSize: 12,
        color: VARIABLES.clrWhite,
    },
    itemActive: {
        fontSize: 12,
        color: VARIABLES.clrThrd,
    },
})

export default function ProjectTasksAppbar({navigation, back, route, params}) {

    return (
        <Appbar.Header statusBarHeight={0} style={{
            backgroundColor: VARIABLES.clrBgDark,
            justifyContent: 'space-between',
            position: 'relative',
            width: '100%',
        }}>
            <Appbar.Content
                title={'TO DO'}
                onPress={() => {navigation.navigate('ProjectTasksToDo', {projectId: route.params.projectId, projectName: route.params.projectName})}}
                titleStyle={route.name === 'ProjectTasksToDo' ?  styles.itemActive : styles.item}
                />
            <Appbar.Content
                title={'WIP'}
                onPress={() => {navigation.navigate('ProjectTasksInProgress', {projectId: route.params.projectId, projectName: route.params.projectName})}}
                titleStyle={route.name === 'ProjectTasksInProgress' ?  styles.itemActive : styles.item}
                />
            <Appbar.Content
                title={'DONE'}
                onPress={() => {navigation.navigate('ProjectTasksDone', {projectId: route.params.projectId, projectName: route.params.projectName})}}
                titleStyle={route.name === 'ProjectTasksDone' ?  styles.itemActive : styles.item}
                />
            <Appbar.Content
                title={'REVIEW'}
                onPress={() => {navigation.navigate('ProjectTasksCodeReview', {projectId: route.params.projectId, projectName: route.params.projectName})}}
                titleStyle={route.name === 'ProjectTasksCodeReview' ?  styles.itemActive : styles.item}
            />
        </Appbar.Header>
    )
}

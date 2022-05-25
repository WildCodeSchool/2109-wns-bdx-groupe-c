import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';

import VARIABLES from '../../../../assets/styles/_variables';

const styles = StyleSheet.create({
    header: {
        backgroundColor: VARIABLES.clrBgDark,
    },
    item: {
        fontSize: 12,
        color: VARIABLES.clrWhite,
    },
    itemActive: {
        fontSize: 12,
        color: VARIABLES.clrThrd,
    },
    listBox: {
        display: 'flex',
        alignItems:'center'
    },
    divider: {
        width: 20,
        borderWidth: 1,
        borderColor: VARIABLES.clrScnd,
    }
})

export default function ProjectsAppbar({navigation, back, route, params}: any) {

    return (
        <Appbar.Header statusBarHeight={0} style={[styles.header]}>
            <Appbar.Content
                title={'All projects'}
                onPress={() => {navigation.navigate('ProjectsAll', {projectId: route.params.projectId, projectName: route.params.projectName})}}
                style={[styles.listBox]}
                titleStyle={route.name === 'ProjectsAll' ?  styles.itemActive : styles.item}
            />
            <View style={[styles.divider]}></View>
            <Appbar.Content
                title={'My projects'}
                onPress={() => {navigation.navigate('ProjectsUser', {projectId: route.params.projectId, projectName: route.params.projectName})}}
                style={[styles.listBox]}
                titleStyle={route.name === 'ProjectsUser' ?  styles.itemActive : styles.item}
            />
        </Appbar.Header>
    )
}

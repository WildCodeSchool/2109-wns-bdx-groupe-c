import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar} from 'react-native-paper';

import VARIABLES from '../../../../assets/styles/_variables';

const styles = StyleSheet.create({
    header: {
        justifyContent: 'center',
        position: 'relative',
        height: 'auto',
        zIndex: 1,
        elevation: 1,
        backgroundColor: VARIABLES.clrBgDark,
    },
})

export default function ProjectAppbar({ navigation, back, route, params }: any) {

    return (
        <Appbar.Header statusBarHeight={0} style={[styles.header]}>

            {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}

            {/* --- READ PROJECTS --- */}
            {route.name == 'Projects' ? (
                <>
                    <Appbar.Content title={'Projets'} style={{backgroundColor: VARIABLES.clrBgDark}} />
                    <Appbar.Action icon="magnify" color={VARIABLES.clrWhite} onPress={() => {navigation.navigate('ProjectSearch')}} />
                </>
            ) : null} 

            {/* --- READ PROJECT --- */}
            {route.name == 'Project' && route.params.screen == undefined ? <Appbar.Content title={`${route.params.projectName}`} style={{backgroundColor: VARIABLES.clrBgDark}} /> : null}
            
            {/* --- SEARCH PROJECT --- */}
            {route.name == 'ProjectSearch' ? <Appbar.Content title={'Projects : search'} style={{backgroundColor: VARIABLES.clrBgDark}} /> : null}

            {/* --- UPDATE INFORMATIONS --- */}
            {route.name == 'ProjectInformations' ? <Appbar.Content title={`${route.params.projectName} : infos`} style={{backgroundColor: VARIABLES.clrBgDark}} /> : null}

            {/* --- READ USERS --- */}
            {route.name == 'ProjectUsers' ? <Appbar.Content title={`${route.params.projectName} : users`} style={{backgroundColor: VARIABLES.clrBgDark}} /> : null}

            {/* --- READ LANGUAGES --- */}
            {route.name == 'ProjectLanguages' ? <Appbar.Content title={`${route.params.projectName} : languages`} style={{backgroundColor: VARIABLES.clrBgDark}} /> : null}

            {/* --- READ TASKS --- */}
            {route.name == 'ProjectTasks' ? (
                <>
                    <Appbar.Content title={`${route.params.projectName} : tasks`} style={{backgroundColor: VARIABLES.clrBgDark}} />
                </>
            
            ) : null}

            {/* --- READ TASK --- */}
            {route.name == 'ProjectTask' ? <Appbar.Content title={`${route.params.projectName} : Task #${route.params.taskId}`} style={{backgroundColor: VARIABLES.clrBgDark}} /> : null}
    
        </Appbar.Header>
    )
}

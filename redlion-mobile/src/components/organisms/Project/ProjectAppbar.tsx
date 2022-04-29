import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, Menu, Searchbar } from 'react-native-paper';

import VARIABLES from '../../../../assets/styles/_variables';
import COMPONENTS from '../../../../assets/styles/_components';

const styles = StyleSheet.create({
    searchbar: {
        width: VARIABLES.windowWidth - 120,
        position: 'absolute',
        bottom: 0,
        left: 10,
    }
})

export default function ProjectAppbar({ navigation, back, route, params }) {

    const [searchActive, setSearchActive] = React.useState(false);
    const [menuActive, setMenuActive] = React.useState(false);
    
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);

    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const onToggleSwitch = () => {
        setIsSwitchOn(!isSwitchOn);
    }

    return (
        <Appbar.Header statusBarHeight={0} style={{
            backgroundColor: VARIABLES.clrBgDark,
            justifyContent: 'center',
            position: 'relative',
        }}>
            {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}

            {/* --- READ PROJECTS --- */}
            {route.name == 'Projects' ? (
                <>
                    <Appbar.Content title={'Projets'} style={{backgroundColor: VARIABLES.clrBgDark}} />
                    <Appbar.Action icon="magnify" color={VARIABLES.clrWhite} onPress={() => {setSearchActive(!searchActive)}} />
                    <Appbar.Action icon="plus" color={VARIABLES.clrWhite} onPress={() => {navigation.navigate('ProjectCreate')}} />
                </>
            ) : null} 

            {/* --- READ PROJECT --- */}
            {route.name == 'Project' && route.params.screen == undefined ? <Appbar.Content title={`${route.params.projectName}`} style={{backgroundColor: VARIABLES.clrBgDark}} /> : null}
            
            {/* --- CREATE PROJECT --- */}
            {route.name == 'ProjectCreate' ? <Appbar.Content title={'Project : create'} style={{backgroundColor: VARIABLES.clrBgDark}} /> : null}
            

            {/* --- UPDATE INFORMATIONS --- */}
            {route.name == 'ProjectInformationsUpdate' ? <Appbar.Content title={`${route.params.projectName} : Update infos`} style={{backgroundColor: VARIABLES.clrBgDark}} /> : null}
                        

            {/* --- UPDATE USERS --- */}
            {route.name == 'ProjectUsersUpdate' ? <Appbar.Content title={`${route.params.projectName} : Update users`} style={{backgroundColor: VARIABLES.clrBgDark}} /> : null}


            {/* --- UPDATE LANGUAGES --- */}
            {route.name == 'ProjectLanguagesUpdate' ? <Appbar.Content title={`${route.params.projectName} : Update languages`} style={{backgroundColor: VARIABLES.clrBgDark}} /> : null}


            {/* --- READ TASKS --- */}
            {route.name == 'ProjectTasks' ? (
                <>
                    <Appbar.Content title={`${route.params.projectName} : Tasks`} style={{backgroundColor: VARIABLES.clrBgDark}} />
                    <Menu
                        contentStyle={COMPONENTS.menuBlock}
                        visible={menuActive}
                        onDismiss={() => setMenuActive(!menuActive)}
                        anchor={
                            <Appbar.Action icon="dots-vertical" color={VARIABLES.clrWhite} onPress={() => setMenuActive(!menuActive)} />
                        }
                        >
                        <Menu.Item onPress={() => {navigation.navigate('ProjectTaskCreate', {taskId: route.params.projectId, projectName: route.params.projectName}); setMenuActive(!menuActive)}} title="Create task" titleStyle={COMPONENTS.menuTitle}  />
                        <Menu.Item onPress={() => {navigation.navigate('ProjectTaskCreate', {taskId: route.params.projectId, projectName: route.params.projectName}); setMenuActive(!menuActive)}} title="Manage task" titleStyle={COMPONENTS.menuTitle} />
                    </Menu>
                </>
            
            ) : null}

            {/* --- READ TASK --- */}
            {route.name == 'ProjectTask' ? <Appbar.Content title={`${route.params.projectName} : Task #${route.params.taskId}`} style={{backgroundColor: VARIABLES.clrBgDark}} /> : null}

            {/* --- CREATE TASK --- */}
            {route.name == 'ProjectTaskCreate' ? <Appbar.Content title={`${route.params.projectName} : Create task`} style={{backgroundColor: VARIABLES.clrBgDark}} /> : null}

            {searchActive ? (
                <Searchbar
                    style={[styles.searchbar]}
                    placeholder={'Search'}
                    value={searchQuery}
                    autoComplete={true}
                    onChangeText={onChangeSearch}
                    onIconPress={() => console.log(true)}
                    />
            ) : null}
        </Appbar.Header>
    )
}

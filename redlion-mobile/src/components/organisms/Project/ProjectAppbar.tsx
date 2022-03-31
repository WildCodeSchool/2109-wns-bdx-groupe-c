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

    console.log('------')
    console.log('------')
    console.log(route)
    console.log('------')
    console.log('------')

    return (
        <Appbar.Header statusBarHeight={0} style={{
            backgroundColor: VARIABLES.clrBgDark,
            justifyContent: 'center',
            position: 'relative',
        }}>
            {back && route.params.screen != 'ProjectTasks' ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
            {back && route.params.screen == 'ProjectTasks' ? <Appbar.BackAction onPress={() => navigation.pop()} /> : null}
            {route.name == 'Project' && route.params.screen == undefined ? <Appbar.Content title={`${route.params.name}`} style={{backgroundColor: VARIABLES.clrBgDark}} /> : null}
            {route.name == 'Project' && route.params.screen != undefined ? <Appbar.Content title={`${route.params.params.name} : Tasks`} style={{backgroundColor: VARIABLES.clrBgDark}} /> : null}
            {route.name == 'ProjectTasks' ? <Appbar.Content title={'Project tasks'} style={{backgroundColor: VARIABLES.clrBgDark}} /> : null}
            {route.name == 'ProjectCreate' ? <Appbar.Content title={'Project : create'} style={{backgroundColor: VARIABLES.clrBgDark}} /> : null}
            {!back ? (
                <>
                    <Appbar.Content title={'Projets'} style={{backgroundColor: VARIABLES.clrBgDark}} />
                    <Appbar.Action icon="magnify" color={VARIABLES.clrWhite} onPress={() => {setSearchActive(!searchActive)}} />
                    <Menu
                        contentStyle={COMPONENTS.menuBlock}
                        visible={menuActive}
                        onDismiss={() => setMenuActive(!menuActive)}
                        anchor={
                            <Appbar.Action icon="dots-vertical" color={VARIABLES.clrWhite} onPress={() => setMenuActive(!menuActive)} />
                        }
                    >
                        <Menu.Item onPress={() => navigation.navigate('ProjectCreate')} title="Create project" titleStyle={COMPONENTS.menuTitle}  />
                        <Menu.Item onPress={() => navigation.navigate('ProjectCreate')} title="Manage project" titleStyle={COMPONENTS.menuTitle} />
                    </Menu>
                </>
            ) : null}
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

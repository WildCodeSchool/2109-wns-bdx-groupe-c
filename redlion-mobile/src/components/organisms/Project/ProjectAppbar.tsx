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

export default function ProjectAppbar({ navigation, back }) {

    const [searchActive, setSearchActive] = React.useState(false);
    const [menuActive, setMenuActive] = React.useState(false);
    
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);

    return (
        <Appbar.Header statusBarHeight={0} style={{
            backgroundColor: VARIABLES.clrBgDark,
            justifyContent: 'center',
            position: 'relative',
        }}>
            {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
            <Appbar.Content title="Projects" style={{backgroundColor: VARIABLES.clrBgDark
            }} />
            {!back ? (
                <>
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

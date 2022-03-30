import React from 'react';
import { View, Text  } from 'react-native';
import { Appbar, Menu, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Ionicons from "@expo/vector-icons/Ionicons";

import VARIABLES from '../../../../assets/styles/_variables';
import COMPONENTS from '../../../../assets/styles/_components';

export default function UserDashboardCardTaskScnd () {

    const [tasksToDoVisible, setTasksToDoVisible] = React.useState(false); // HomeCard 2 : Tasks > To do ===> menu hide/off

    const navigation = useNavigation();

    return (
        <View style={COMPONENTS.homeCard}>
        <View style={[COMPONENTS.homeCardTopColor, COMPONENTS.homeCardTopColorToDo]}></View>
        <View style={COMPONENTS.homeCardTop}>
          <Ionicons name={'folder-open'} style={COMPONENTS.homeCardIcon} />
          <Text style={COMPONENTS.homeCardName}>Tasks : To do</Text>
        </View>
        <View style={COMPONENTS.homeCardBody}>
          <Text style={COMPONENTS.homeCardBodyText}>Vous avez 15 tâches à faire</Text>
          <Menu
            contentStyle={COMPONENTS.menuBlock}
            visible={tasksToDoVisible}
            onDismiss={() => {setTasksToDoVisible(!tasksToDoVisible)}}
            anchor={<Appbar.Action icon={'dots-horizontal'} color={VARIABLES.clrWhite} onPress={() => {setTasksToDoVisible(!tasksToDoVisible)}} />}>
            <Menu.Item onPress={() => {navigation.navigate('UserTasksToDo', {})}} title="Mes tâches à faire" titleStyle={COMPONENTS.menuTitle} />
            <Divider />
            <Menu.Item onPress={() => {}} title="Tout voir" titleStyle={COMPONENTS.menuTitle} />
          </Menu>
        </View>
      </View>
    )
}
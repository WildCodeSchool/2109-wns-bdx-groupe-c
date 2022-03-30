import React from 'react';
import { View, Text  } from 'react-native';
import { Appbar, Menu, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Ionicons from "@expo/vector-icons/Ionicons";

import VARIABLES from '../../../../assets/styles/_variables';
import UserDashboardCardStyles from '../../../../assets/styles/UserDashboardCardStyle';
import COMPONENTS from '../../../../assets/styles/_components';

export default function UserDashboardCardTaskFrst () {

    const [tasksDoingVisible, setTasksDoingVisible] = React.useState(false); // HomeCard 1 : Tasks > Doing ===> menu hide/off

    const navigation = useNavigation();

    return (
    <View style={COMPONENTS.homeCard}>
        <View style={[COMPONENTS.homeCardTopColor, COMPONENTS.homeCardTopColorDoing]}></View>
        <View style={COMPONENTS.homeCardTop}>
          <Ionicons name={'folder-open'} style={COMPONENTS.homeCardIcon} />
          <Text style={COMPONENTS.homeCardName}>Tasks : Doing</Text>
        </View>
        <View style={COMPONENTS.homeCardBody}>
          <Text style={COMPONENTS.homeCardBodyText}>Vous avez 5 tâches en cours</Text>
          <Menu
            contentStyle={COMPONENTS.menuBlock}
            visible={tasksDoingVisible}
            onDismiss={() => {setTasksDoingVisible(!tasksDoingVisible)}}
            anchor={<Appbar.Action icon={'dots-horizontal'} color={VARIABLES.clrWhite} onPress={() => {setTasksDoingVisible(!tasksDoingVisible)}} />}>
            <Menu.Item onPress={() => {navigation.navigate('UserTasksDoing', {})}} title="Mes tâches en cours" titleStyle={COMPONENTS.menuTitle} />
            <Divider />
            <Menu.Item onPress={() => {}} title="Tout voir" titleStyle={COMPONENTS.menuTitle} />
          </Menu>
        </View>
      </View>
    )
}
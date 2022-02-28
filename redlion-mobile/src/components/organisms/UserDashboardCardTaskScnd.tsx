import React from 'react';
import { View, Text  } from 'react-native';
import { Appbar, Menu, Divider } from 'react-native-paper';
import Ionicons from "@expo/vector-icons/Ionicons";

import VARIABLES from '../../../assets/styles/_variables';

import UserDashboardCardStyles from '../../../assets/styles/UserDashboardCardStyle';

export default function UserDashboardCardTaskScnd () {

    const [tasksToDoVisible, setTasksToDoVisible] = React.useState(false); // HomeCard 2 : Tasks > To do ===> menu hide/off

    return (
        <View style={UserDashboardCardStyles.homeCard}>
        <View style={[UserDashboardCardStyles.homeCardTopColor, UserDashboardCardStyles.homeCardTopColorToDo]}></View>
        <View style={UserDashboardCardStyles.homeCardTop}>
          <Ionicons name={'folder-open'} style={UserDashboardCardStyles.homeCardIcon} />
          <Text style={UserDashboardCardStyles.homeCardName}>Tasks : To do</Text>
        </View>
        <View style={UserDashboardCardStyles.homeCardBody}>
          <Text style={UserDashboardCardStyles.homeCardBodyText}>Vous avez 15 tâches à faire</Text>
          <Menu
            contentStyle={UserDashboardCardStyles.homeCardMenu}
            visible={tasksToDoVisible}
            onDismiss={() => {setTasksToDoVisible(!tasksToDoVisible)}}
            anchor={<Appbar.Action icon={'dots-horizontal'} color={VARIABLES.clrWhite} onPress={() => {setTasksToDoVisible(!tasksToDoVisible)}} />}>
            <Menu.Item onPress={() => {}} title="Mes tâches à faire" titleStyle={UserDashboardCardStyles.homeCardMenuTitle} />
            <Divider />
            <Menu.Item onPress={() => {}} title="Tout voir" titleStyle={UserDashboardCardStyles.homeCardMenuTitle} />
          </Menu>
        </View>
      </View>
    )
}
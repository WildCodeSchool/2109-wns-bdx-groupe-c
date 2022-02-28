import React from 'react';
import { View, Text  } from 'react-native';
import { Appbar, Menu, Divider } from 'react-native-paper';
import Ionicons from "@expo/vector-icons/Ionicons";

import VARIABLES from '../../../assets/styles/_variables';

import UserDashboardCardStyles from '../../../assets/styles/UserDashboardCardStyle';

export default function UserDashboardCardTaskFrst () {

    const [tasksDoingVisible, setTasksDoingVisible] = React.useState(false); // HomeCard 1 : Tasks > Doing ===> menu hide/off

    return (
    <View style={UserDashboardCardStyles.homeCard}>
        <View style={[UserDashboardCardStyles.homeCardTopColor, UserDashboardCardStyles.homeCardTopColorDoing]}></View>
        <View style={UserDashboardCardStyles.homeCardTop}>
          <Ionicons name={'folder-open'} style={UserDashboardCardStyles.homeCardIcon} />
          <Text style={UserDashboardCardStyles.homeCardName}>Tasks : Doing</Text>
        </View>
        <View style={UserDashboardCardStyles.homeCardBody}>
          <Text style={UserDashboardCardStyles.homeCardBodyText}>Vous avez 5 tâches en cours</Text>
          <Menu
            contentStyle={UserDashboardCardStyles.homeCardMenu}
            visible={tasksDoingVisible}
            onDismiss={() => {setTasksDoingVisible(!tasksDoingVisible)}}
            anchor={<Appbar.Action icon={'dots-horizontal'} color={VARIABLES.clrWhite} onPress={() => {setTasksDoingVisible(!tasksDoingVisible)}} />}>
            <Menu.Item onPress={() => {}} title="Mes tâches en cours" titleStyle={UserDashboardCardStyles.homeCardMenuTitle} />
            <Divider />
            <Menu.Item onPress={() => {}} title="Tout voir" titleStyle={UserDashboardCardStyles.homeCardMenuTitle} />
          </Menu>
        </View>
      </View>
    )
}
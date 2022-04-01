import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from "@expo/vector-icons/Ionicons";

import VARIABLES from '../../../../assets/styles/_variables';
import COMPONENTS from '../../../../assets/styles/_components';

export default function UserDashboardCardTaskFrst () {

    const [tasksDoingVisible, setTasksDoingVisible] = React.useState(false); // HomeCard 1 : Tasks > Doing ===> menu hide/off

    const navigation = useNavigation();

    return (
      <TouchableOpacity
        onPress={() => {navigation.navigate('UserTasksDoing', {statusName: 'In Progress'})}}
        activeOpacity={.8}
      >
      <View style={COMPONENTS.homeCard}>
          <View style={[COMPONENTS.homeCardTopColor, COMPONENTS.homeCardTopColorDoing]}></View>
          <View style={COMPONENTS.homeCardTop}>
            <Ionicons name={'folder-open'} style={COMPONENTS.homeCardIcon} />
            <Text style={COMPONENTS.homeCardName}>Tasks : Doing</Text>
          </View>
          <View style={COMPONENTS.homeCardBody}>
            <Text style={COMPONENTS.homeCardBodyText}>Vous avez 5 tâches en cours</Text>
          </View>
        </View>
      </TouchableOpacity>

    )
}
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from "@expo/vector-icons/Ionicons";

import VARIABLES from '../../../../assets/styles/_variables';
import COMPONENTS from '../../../../assets/styles/_components';

export default function UserDashboardCardTaskScnd () {

  const [tasksToDoVisible, setTasksToDoVisible] = React.useState(false); // HomeCard 2 : Tasks > To do ===> menu hide/off

  const navigation = useNavigation();

  return (
    <TouchableOpacity
    onPress={() => {navigation.navigate('UserTasksToDo', {statusName: 'To Do'})}}
    activeOpacity={.8}
    >
      <View style={COMPONENTS.homeCard}>
        <View style={[COMPONENTS.homeCardTopColor, COMPONENTS.homeCardTopColorToDo]}></View>
        <View style={COMPONENTS.homeCardTop}>
          <Ionicons name={'folder-open'} style={COMPONENTS.homeCardIcon} />
          <Text style={COMPONENTS.homeCardName}>Tasks : To do</Text>
        </View>
        <View style={COMPONENTS.homeCardBody}>
          <Text style={COMPONENTS.homeCardBodyText}>Vous avez 15 tâches à faire</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
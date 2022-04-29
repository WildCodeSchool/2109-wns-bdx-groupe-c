import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from '@apollo/client';

import { Tasks_tasks } from '../../../schemaTypes';
import { GET_TASKS_BY_STATUS_AND_USER } from '../../../queries/task';

import VARIABLES from '../../../../assets/styles/_variables';
import COMPONENTS from '../../../../assets/styles/_components';

export default function UserDashboardCardTaskFrst ({ userId = 3 , statusName = 'In Progress' }) {

    const [tasksDoingVisible, setTasksDoingVisible] = React.useState(false); // HomeCard 1 : Tasks > Doing ===> menu hide/off

    const navigation = useNavigation();

    const { loading, error, data } = useQuery<Tasks_tasks>(GET_TASKS_BY_STATUS_AND_USER, {
      variables: { userId, statusName },
    });

    return (
      <TouchableOpacity
        onPress={() => {navigation.navigate('UserTasksDoing', {statusName: 'In Progress'})}}
        activeOpacity={.8}
      >
      {loading ? <ActivityIndicator /> : null}
      {data &&
        <View style={COMPONENTS.homeCard}>
          <View style={[COMPONENTS.homeCardTopColor, COMPONENTS.homeCardTopColorDoing]}></View>
          <View style={COMPONENTS.homeCardTop}>
            <Ionicons name={'folder-open'} style={COMPONENTS.homeCardIcon} />
            <Text style={COMPONENTS.homeCardName}>Tasks : Doing</Text>
          </View>
          <View style={COMPONENTS.homeCardBody}>
            <Text style={COMPONENTS.homeCardBodyText}>Vous avez {data.myTasks.length} tâches en cours</Text>
          </View>
        </View>
      }
      </TouchableOpacity>

    )
}
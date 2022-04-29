import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from '@apollo/client';

import { Tasks_tasks } from '../../../schemaTypes';
import { GET_TASKS_BY_STATUS_AND_USER } from '../../../queries/task';

import useMyTasks from '../../customHook/userMyTasks';

import COMPONENTS from '../../../../assets/styles/_components';

export default function UserDashboardCardTaskScnd ({ userId = 3 , statusName = 'To Do' }) {

  const statusName = 'To Do';

  const navigation = useNavigation();

  const [tasks, loading] = useMyTasks(statusName);

  const myTasks = useMemo(() => {
      if (tasks && typeof tasks !== 'boolean') {
          return tasks;
      }
      return '';
  }, [tasks])

  return (
    <TouchableOpacity
      onPress={() => {navigation.navigate('UserTasksToDo', {statusName: statusName})}}
      activeOpacity={.8}
    >
      {loading ? <ActivityIndicator/> : null}
      {tasks &&
        <View style={COMPONENTS.homeCard}>
          <View style={[COMPONENTS.homeCardTopColor, COMPONENTS.homeCardTopColorToDo]}></View>
          <View style={COMPONENTS.homeCardTop}>
            <Ionicons name={'folder-open'} style={COMPONENTS.homeCardIcon} />
            <Text style={COMPONENTS.homeCardName}>Tasks : To do</Text>
          </View>
          <View style={COMPONENTS.homeCardBody}>
            <Text style={COMPONENTS.homeCardBodyText}>Vous avez {myTasks.length} tâches à faire</Text>
          </View>
        </View>
      }
    </TouchableOpacity>
  )
}
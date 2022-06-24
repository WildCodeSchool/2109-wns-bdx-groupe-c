import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from "@expo/vector-icons/Ionicons";

import { Tasks_tasks } from '../../../schemaTypes';
import { GET_TASKS_BY_STATUS_AND_USER } from '../../../queries/task';

import COMPONENTS from '../../../../assets/styles/_components';
import useMyTasks from '../../customHook/userMyTasks';

export default function UserDashboardCardTaskFrst ({ statusName = 'In Progress' }) {

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
        onPress={() => {navigation.navigate('UserTasksDoing', {statusName: statusName})}}
        activeOpacity={.8}
      >
      {loading ? <ActivityIndicator /> : null}
      {tasks &&
        <View style={COMPONENTS.homeCard}>
          <View style={[COMPONENTS.homeCardTopColor, COMPONENTS.homeCardTopColorDoing]}></View>
          <View style={COMPONENTS.homeCardTop}>
            <Ionicons name={'folder-open'} style={COMPONENTS.homeCardIcon} />
            <Text style={COMPONENTS.homeCardName}>Tasks : Doing</Text>
          </View>
          <View style={COMPONENTS.homeCardBody}>
            <Text style={COMPONENTS.homeCardBodyText}>Vous avez {myTasks.length} tâches en cours</Text>
          </View>
        </View>
      }
      </TouchableOpacity>

    )
}
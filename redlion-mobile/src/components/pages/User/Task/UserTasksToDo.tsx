import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { useQuery } from "@apollo/client";
import { useNavigation } from '@react-navigation/native';

import { Tasks_tasks } from '../../../../schemaTypes';
import { GET_TASKS_BY_STATUS_AND_USER } from '../../../../queries/task';

import VARIABLES from '../../../../../assets/styles/_variables';

const UserTasksToDo = (route: any, { userId = 3 }) => {
    
  const { statusName } = route.route.params;

  const { loading, error, data } = useQuery<Tasks_tasks>(GET_TASKS_BY_STATUS_AND_USER, {
    variables: { userId, statusName },
  });

  const navigation = useNavigation();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    taskContainer: {
      flex: 1,
      marginTop: 15,
      padding: 10,
      width: VARIABLES.windowWidth - 20,
      borderWidth: 1,
      borderRadius: 18,
      borderColor: VARIABLES.clrTag2,
    },
    item: {
      marginBottom: 10,
      color: VARIABLES.clrWhite,
    },
    button: {
        alignSelf: 'center',
        width: '80%',
    }
  });

  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator /> : null}
      {data &&
        <FlatList
        data = {data.myTasks}
        keyExtractor={(task) => task.id}
        renderItem={(task) => {
          return (
              <TouchableOpacity
                onPress={() => navigation.navigate('UserTask', {taskId: task.item.id})}
                activeOpacity={.7}
              >
                <View style={styles.taskContainer}>
                  <Text style={styles.item}>
                        {task.item.subject}
                    </Text>
                    <Text style={styles.item}>
                        {task.item.shortText}
                    </Text>
                    <Text style={[styles.item ,{marginBottom: 0, color: VARIABLES.clrTag2}]}>
                        {task.item.project.name}
                    </Text>
                </View>
              </TouchableOpacity>
          )}
        }
      />
      }
    </View>
  );
}

export default UserTasksToDo;
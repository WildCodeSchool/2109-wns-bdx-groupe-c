import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, FlexAlignType } from 'react-native';
import { useQuery } from "@apollo/client";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { Tasks as TasksProps } from "../../../../schemaTypes";
import { GET_TASKS_BY_PROJECT } from '../../../../queries/task';

import VARIABLES from '../../../../../assets/styles/_variables';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
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
    borderColor: VARIABLES.clrTag3,
  },
  item: {
    color: VARIABLES.clrWhite,
  },
});

const ProjectTasksInProgress = (route: any) => {
  
  const navigation = useNavigation();

  const { projectId, projectName } = route.route.params.route;

  const { loading, error, data }= useQuery<TasksProps>(GET_TASKS_BY_PROJECT, {
    variables: {projectId: parseInt(projectId)},
  });

  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator /> : null}
      {data &&
        <FlatList
        data = {data.tasks.filter((task) => task?.status?.name == 'In Progress')}
        keyExtractor={(task) => task.id}
        renderItem={(task) => {
          return (
              <TouchableOpacity
                onPress={() => navigation.navigate('ProjectTask', {taskId: task.item.id, projectName: projectName})}
                activeOpacity={.7}
              >
                <View style={styles.taskContainer}>
                    <Text style={[styles.item, {marginBottom: 10}]}>
                        {task.item.subject}
                    </Text>
                    <Text style={styles.item}>
                        {task.item.shortText}
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

export default ProjectTasksInProgress;
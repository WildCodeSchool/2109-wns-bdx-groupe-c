import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Button } from 'react-native';

import { useQuery } from "@apollo/client";
import { Tasks as TasksProps } from "../../../../schemaTypes";
import gql from "graphql-tag";
import { useNavigation } from '@react-navigation/native';
import VARIABLES from '../../../../../assets/styles/_variables';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ProjectTasks = (route: any) => {

  const { projectId, projectName } = route.route.params;

  const GET_TASKS = gql`
  query Tasks($projectId: Float!) {
    tasks(projectId: $projectId) {
      id
      subject
      shortText
      description
      status {
        name
      }
      createdAt
      updatedAt
      dueDate
      expectedDuration
      spentTime
      comments {
        content
        createdAt
        updatedAt
      }
    }
  }
  `;
  const navigation = useNavigation();
  
  const { loading, error, data }= useQuery<TasksProps>(GET_TASKS, {
      variables: {projectId: parseInt(projectId)},
    });

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
      borderColor: VARIABLES.clrTag4,
    },
    item: {
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
        data = {data.tasks}
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

export default ProjectTasks;
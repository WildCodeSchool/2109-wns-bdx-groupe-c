import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Button } from 'react-native';

import { useQuery } from "@apollo/client";
import { Tasks as TasksProps } from "../schemaTypes";
import gql from "graphql-tag";


const Tasks = ({  navigation, route }) => {

  const { projectId } = route.params;

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
      marginTop: 20,
      flex: 1,
      height: 200,
      width: 200,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'yellow',
    },
    item: {
      backgroundColor: '#f9c2ff',
    },
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
            <View style={styles.taskContainer}>
              <Text style={styles.item}>
                {task.item.subject}
              </Text>
              <Text style={styles.item}>
                {task.item.shortText}
              </Text>
              <Text style={styles.item}>
                {task.item.description}
              </Text>
              <Button
                title="See Task Details"
                onPress={() => navigation.navigate('Task', {taskId: task.item.id})}
              />
            </View>
          )}
        }
      />
      }
    </View>
  );
}

export default Tasks;
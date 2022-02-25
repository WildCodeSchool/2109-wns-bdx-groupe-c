import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

import { useQuery } from "@apollo/client";

import gql from "graphql-tag";

import { Tasks_tasks as TaskProps } from "../../schemaTypes";

const Task = ({ route }) => {

  const { taskId } = route.params;


  const GET_TASK = gql`
  query Task($taskId: Float!) {
    task(id: $taskId) {
      id
      subject
      shortText
      description
      status {
        name
      }
      assignee {
        firstName
      }
      createdAt
      updatedAt
      dueDate
      expectedDuration
      spentTime
    }
  }
  `;

  const { loading, error, data }= useQuery<TaskProps>(GET_TASK, {
    variables: {taskId: parseInt(taskId)},
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    taskContainer: {
      flex: 1,
    }
  });
  console.log(data);

  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator /> : null}

      {data &&
        <View style={styles.taskContainer}>
          <Text>
            Subject : {data.task.subject}
          </Text>
          <Text>
            shortText : {data.task.shortText}
          </Text>
          <Text>
            description : {data.task.description}
          </Text>
          <Text>
            Created At : {data.task.createdAt}
          </Text>
          <Text>
            UpdatedAt At : {data.task.updatedAt}
          </Text>
          <Text>
            expectedDuration : {data.task.expectedDuration}
          </Text>
          <Text>
            spentTime : {data.task.spentTime}
          </Text>
        </View>
      }
    </View>
  );
}

export default Task;
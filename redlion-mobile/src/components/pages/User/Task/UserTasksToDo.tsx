import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Button, TouchableOpacity } from 'react-native';
import { useQuery } from "@apollo/client";
import { Tasks as TasksProps } from "../../../../schemaTypes";
import gql from "graphql-tag";
import { useNavigation } from '@react-navigation/native';
import VARIABLES from '../../../../../assets/styles/_variables';

const UserTasksToDo = (route: any) => {
    
  const { statusName } = route.route.params;

  const GET_TASKS = gql`
  query Tasks($statusName: String!) {
    tasksByStatus(statusName: $statusName) {
        id
        shortText
        subject
        status {
          name
        }
        description
        project {
          name
          shortText
        }
        assignee {
          id
          firstName
          lastName
        }
        createdAt
        updatedAt
        dueDate
        expectedDuration
        spentTime
      }
  }
  `;

  const navigation = useNavigation();

  const { loading, error, data }= useQuery<TasksProps>(GET_TASKS, {
    variables: {statusName: statusName},
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
        data = {data.tasksByStatus}
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
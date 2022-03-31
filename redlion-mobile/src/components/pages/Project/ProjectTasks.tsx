import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Button } from 'react-native';

import { useQuery } from "@apollo/client";
import { Tasks as TasksProps } from "../../../schemaTypes";
import gql from "graphql-tag";
import { useNavigation } from '@react-navigation/native';
import VARIABLES from '../../../../assets/styles/_variables';


const ProjectTasks = (route: any) => {

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
      color: VARIABLES.clrWhite,
    },
  });

  console.log('XXXXXXXXXXXXXXX')
  console.log(data)
  console.log('XXXXXXXXXXXXXXX')

  return (
    <View style={styles.container}>
        <Text style={styles.item}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum fugit consequatur rerum alias culpa, tempora fuga facilis optio quibusdam harum, debitis, quaerat animi tenetur error corporis provident officia et quae!</Text>
      {loading ? <ActivityIndicator /> : null}
      {data &&
        <FlatList
        data = {data.project.tasks}
        keyExtractor={(task) => task.id}
        renderItem={(task) => {
          return (
            <View style={styles.taskContainer}>
              <Text style={styles.item}>
                {task.subject}
              </Text>
              <Text style={styles.item}>
                {task.shortText}
              </Text>
              <Text style={styles.item}>
                {task.description}
              </Text>
              <Button
                title="See Task Details"
                onPress={() => navigation.navigate('Task', {taskId: task.id})}
              />
            </View>
          )}
        }
      />
      }
    </View>
  );
}

export default ProjectTasks;
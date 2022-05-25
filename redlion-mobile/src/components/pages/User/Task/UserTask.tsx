import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useQuery } from "@apollo/client";

import { GET_TASK } from '../../../../queries/task';
import { Task_task } from "../../../../schemaTypes";

import VARIABLES from '../../../../../assets/styles/_variables';

const UserTask = (route: any) => {

  const { taskId } = route.route.params;
  
  const { loading, error, data }= useQuery<Task_task>(GET_TASK, {
    variables: {taskId: parseInt(taskId)},
  });

  const convertDate = (option: any) => {
    let result = new Date(Date.parse(option));
    return `${result.toLocaleDateString()} ${result.toLocaleTimeString('en-GB')}`
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: VARIABLES.clrBgDark,
    },
    taskContainer: {
      marginTop: 15,
      padding: 10,
      width: VARIABLES.windowWidth - 20,
      borderWidth: 1,
      borderRadius: 18,
      borderColor: VARIABLES.clrTag4,
  
    },
    task: {
      marginBottom: 10,
    },
    block: {
      flexDirection: 'column',
      marginBottom: 5,
    },
    text: {
        color: VARIABLES.clrWhite,
    },
    title: {
      color: VARIABLES.clrTag4,
    }

  });

  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator /> : null}

      {data &&
        <View style={styles.taskContainer}>
          <View style={styles.task}>
            <Text style={[styles.text, styles.title]}>{data.task.subject}</Text>
          </View>
          <View style={styles.task}>
            <View style={styles.block}>
              <Text style={[styles.text, styles.title]}>Status : </Text>
              <Text style={styles.text}>{data.task.status?.name}</Text>
            </View>
          </View>
          <View style={styles.task}>
            <View style={styles.block}>
              <Text style={[styles.text, styles.title]}>Short text : </Text>
              <Text style={styles.text}>{data.task.shortText}</Text>
            </View>
            <View style={styles.block}>
              <Text style={[styles.text, styles.title]}>Description : </Text>
              <Text style={styles.text}>{data.task.description}</Text>
            </View>
          </View>
          <View style={styles.task}>
            <View style={styles.block}>
              <Text style={[styles.text, styles.title]}>Expected duration :</Text>
              <Text style={styles.text}>{data.task.expectedDuration}</Text>
            </View>
            <View style={styles.block}>
              <Text style={[styles.text, styles.title]}>Spent time :</Text>
              <Text style={styles.text}>{data.task.spentTime}</Text>
            </View>
          </View>
          <View style={styles.task}>
            <View style={styles.block}>
              <Text style={[styles.text, styles.title]}>Created at :</Text>
              <Text style={styles.text}>{convertDate(data.task.createdAt)}</Text>
            </View>
            <View style={styles.block}>
              <Text style={[styles.text, styles.title]}>Updated at :</Text>
              <Text style={styles.text}>{convertDate(data.task.updatedAt)}</Text>
            </View>
          </View>
        </View>
      }
    </View>
  );
}

export default UserTask;
import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import useMyTasks from '../../../customHook/userMyTasks';

import VARIABLES from '../../../../../assets/styles/_variables';

const UserTasksDoing = () => {
    
  const statusName = 'In Progress';

  const navigation = useNavigation();

  const [tasks, loading] = useMyTasks(statusName);

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
      {tasks &&
        <FlatList
        data = {tasks}
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
                    <Text style={[styles.item ,{marginBottom: 0, color: VARIABLES.clrTag4}]}>
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

export default UserTasksDoing;
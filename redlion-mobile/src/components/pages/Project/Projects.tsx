<<<<<<< HEAD
import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import VARIABLES from '../../../../assets/styles/_variables';
=======
import * as React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useQuery } from "@apollo/client";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ProgressBar, Switch } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { Projects as ProjectsType } from "../../../schemaTypes";
import { GET_PROJECTS } from '../../../queries/project';

import VARIABLES from '../../../../assets/styles/_variables';
import COMPONENTS from '../../../../assets/styles/_components';
import useMyProjects from '../../customHook/userMyProjects';
>>>>>>> [MOBILE] setting up the pages

import ProjectsAll from './ProjectsAll';
import ProjectsUser from './ProjectsUser';
import ProjectsAppbar from '../../organisms/Project/ProjectsAppbar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerHeader: {
    flexDirection: 'row',
    width: VARIABLES.windowWidth - 20,
  },
  containerHeaderButton: {
    fontSize: 10,
    color: VARIABLES.clrWhite,
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

const Projects = (route: any) => {

    const Stack = createStackNavigator();

    const forFade = (current: any) => ({
        cardStyle: {
            opacity: current.progress,
        },
    });
  
    return (
        <Stack.Navigator
            initialRouteName="ProjectTasksToDo"
            screenOptions={() => ({
                headerBackTitleVisible: false,
                headerStyle: {
                    backgroundColor: VARIABLES.clrBgDark,
                },
                headerTintColor: VARIABLES.clrWhite,
                cardStyle: {
                    backgroundColor: VARIABLES.clrBgDark,
                },
                header: (props) => <ProjectsAppbar params={{route: route}} {...props} />,
            })}    
        >
            <Stack.Screen name="ProjectsAll" component={ProjectsAll} initialParams={{route: route.route.params}} options={{cardStyleInterpolator: forFade}} />
            <Stack.Screen name="ProjectsUser" component={ProjectsUser} initialParams={{route: route.route.params}} options={{cardStyleInterpolator: forFade}} />
        </Stack.Navigator>
    );
}

export default Projects;

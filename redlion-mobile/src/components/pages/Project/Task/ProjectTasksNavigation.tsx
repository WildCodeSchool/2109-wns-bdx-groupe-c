import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import VARIABLES from '../../../../../assets/styles/_variables';

import ProjectTasksAppbar from '../../../organisms/Project/ProjectTasksAppbar';
import ProjectTasksToDo from './ProjectTasksToDo';
import ProjectTasksInProgress from './ProjectTasksInProgress';
import ProjectTasksDone from './ProjectTasksDone';
import ProjectTasksCodeReview from './ProjectTasksCodeReview';

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

const ProjectTasksNavigation = (route: any) => {

    const Stack = createStackNavigator();

    const forFade = ({ current }) => ({
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
                header: (props) => <ProjectTasksAppbar params={{route: route}} {...props} />,
            })}    
        >
            <Stack.Screen name="ProjectTasksToDo" component={ProjectTasksToDo} initialParams={{route: route.route.params}} options={{cardStyleInterpolator: forFade}} />
            <Stack.Screen name="ProjectTasksInProgress" component={ProjectTasksInProgress} initialParams={{route: route.route.params}} options={{cardStyleInterpolator: forFade}} />
            <Stack.Screen name="ProjectTasksDone" component={ProjectTasksDone} initialParams={{route: route.route.params}} options={{cardStyleInterpolator: forFade}} />
            <Stack.Screen name="ProjectTasksCodeReview" component={ProjectTasksCodeReview} initialParams={{route: route.route.params}} options={{cardStyleInterpolator: forFade}} />
        </Stack.Navigator>
    );
}

export default ProjectTasksNavigation;
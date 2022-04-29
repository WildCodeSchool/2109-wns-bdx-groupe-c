import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import VARIABLES from '../../../../assets/styles/_variables';

import ProjectAppbar from '../../organisms/Project/ProjectAppbar';
import Projects from './Projects';
import Project from './Project';
import ProjectCreate from './ProjectCreate';
import ProjectTasks from './Task/ProjectTasks';
import ProjectTask from './Task/ProjectTask';
import ProjectTaskCreate from './Task/ProjectTaskCreate';
import ProjectInformationsUpdate from './Information/ProjectInformationsUpdate';
import ProjectUsersUpdate from './User/ProjectUsersUpdate';
import ProjectLanguagesUpdate from './Language/ProjectLanguagesUpdate';
import ProjectTasksNavigation from './Task/ProjectTasksNavigation';

export default function ProjectNavigation() {

    const Stack = createStackNavigator();

    const forFade = ({ current }) => ({
        cardStyle: {
            opacity: current.progress,
        },
    });

    return (
        <Stack.Navigator
        initialRouteName="Projects"
        screenOptions={() => ({
            headerStyle: {
                backgroundColor: VARIABLES.clrBgDark,
            },
            headerTintColor: VARIABLES.clrWhite,
            cardStyle: {
                backgroundColor: VARIABLES.clrBgDark,
            },
            header: (props) => <ProjectAppbar params={undefined} {...props} />,
        })}
    >
      <Stack.Screen name="Projects" component={Projects} options={{cardStyleInterpolator: forFade}} />
      <Stack.Screen name="Project" component={Project} options={{cardStyleInterpolator: forFade}} />
      <Stack.Screen name="ProjectCreate" component={ProjectCreate} options={{cardStyleInterpolator: forFade}} />
      <Stack.Screen name="ProjectInformationsUpdate" component={ProjectInformationsUpdate} options={{cardStyleInterpolator: forFade}} />
      <Stack.Screen name="ProjectUsersUpdate" component={ProjectUsersUpdate} options={{cardStyleInterpolator: forFade}} />
      <Stack.Screen name="ProjectLanguagesUpdate" component={ProjectLanguagesUpdate} options={{cardStyleInterpolator: forFade}} />
      <Stack.Screen name="ProjectTasks" component={ProjectTasksNavigation} options={{cardStyleInterpolator: forFade}} />
      <Stack.Screen name="ProjectTask" component={ProjectTask} options={{cardStyleInterpolator: forFade}} />
      <Stack.Screen name="ProjectTaskCreate" component={ProjectTaskCreate} options={{cardStyleInterpolator: forFade}} />
    </Stack.Navigator>
    )
}

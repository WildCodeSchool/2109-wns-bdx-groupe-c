import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import VARIABLES from '../../../../assets/styles/_variables';

import ProjectAppbar from '../../organisms/Project/ProjectAppbar';
import Projects from './Projects';
import Project from './Project';
import ProjectTask from './Task/ProjectTask';
import ProjectInformations from './Information/ProjectInformations';
import ProjectUsers from './User/ProjectUsers';
import ProjectLanguages from './Language/ProjectLanguages';
import ProjectTasksNavigation from './Task/ProjectTasksNavigation';
import ProjectSearch from './ProjectSearch';

export default function ProjectNavigation() {

    const Stack = createStackNavigator();

    const forFade = (current: any) => ({
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
      <Stack.Screen name="ProjectSearch" component={ProjectSearch} options={{cardStyleInterpolator: forFade}} />
      <Stack.Screen name="ProjectInformations" component={ProjectInformations} options={{cardStyleInterpolator: forFade}} />
      <Stack.Screen name="ProjectUsers" component={ProjectUsers} options={{cardStyleInterpolator: forFade}} />
      <Stack.Screen name="ProjectLanguages" component={ProjectLanguages} options={{cardStyleInterpolator: forFade}} />
      <Stack.Screen name="ProjectTasks" component={ProjectTasksNavigation} options={{cardStyleInterpolator: forFade}} />
      <Stack.Screen name="ProjectTask" component={ProjectTask} options={{cardStyleInterpolator: forFade}} />
    </Stack.Navigator>
    )
}

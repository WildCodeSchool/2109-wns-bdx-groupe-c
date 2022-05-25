import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import VARIABLES from '../../../../assets/styles/_variables';

import ProjectsAll from './ProjectsAll';
import ProjectsUser from './ProjectsUser';
import ProjectTasksAppbar from '../../organisms/Project/ProjectTasksAppbar';

const ProjectsNavigation = (route: any) => {

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
                header: (props) => <ProjectTasksAppbar params={{route: route}} {...props} />,
            })}    
        >
            <Stack.Screen name="ProjectTasksToDo" component={ProjectsAll} initialParams={{route: route.route.params}} options={{cardStyleInterpolator: forFade}} />
            <Stack.Screen name="ProjectTasksInProgress" component={ProjectsUser} initialParams={{route: route.route.params}} options={{cardStyleInterpolator: forFade}} />
        </Stack.Navigator>
    );
}

export default ProjectsNavigation;
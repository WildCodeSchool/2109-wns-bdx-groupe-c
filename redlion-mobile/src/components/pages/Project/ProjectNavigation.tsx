import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import VARIABLES from '../../../../assets/styles/_variables';

import ProjectAppbar from '../../organisms/Project/ProjectAppbar';
import Projects from './Projects';
import ProjectCreate from './ProjectCreate';
import Project from './Project';


export default function ProjectNavigation() {

    const Stack = createStackNavigator();

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
            header: (props) => <ProjectAppbar {...props} />,
        })}
    >
      <Stack.Screen name="Projects" component={Projects} options={{headerTitle: 'Projects'}} />
      <Stack.Screen name="ProjectCreate" component={ProjectCreate} options={{headerTitle: 'Project - Create'}} />
      <Stack.Screen name="Project" component={Project} options={{headerTitle: 'Project : #'}} />
    </Stack.Navigator>
    )
}

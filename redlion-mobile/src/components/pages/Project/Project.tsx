import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

import VARIABLES from '../../../../assets/styles/_variables';
import COMPONENTS from '../../../../assets/styles/_components';

import ProjectAppbar from '../../organisms/Project/ProjectAppbar';

import ProjectMain from './ProjectMain';
import ProjectCreate from './ProjectCreate';
import ProjectRead from './ProjectRead';

const styles = StyleSheet.create({

})

export default function ProjectView() {

    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
        initialRouteName="Project"
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
      <Stack.Screen name="ProjectMain" component={ProjectMain} options={{headerTitle: 'Projects'}} />
      <Stack.Screen name="ProjectCreate" component={ProjectCreate} options={{headerTitle: 'Project - Create'}} />
      <Stack.Screen name="ProjectRead" component={ProjectRead} options={{headerTitle: 'Project : #'}} />
    </Stack.Navigator>
    )
}

import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import VARIABLES from '../../../../assets/styles/_variables';

import User from './User';
import UserTasksDoing from './UserTasksDoing';
import UserTasksToDo from './UserTasksToDo';

export default function UserNavigation() {

    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
        initialRouteName="User"
        screenOptions={() => ({
            headerStyle: {
                backgroundColor: VARIABLES.clrBgDark,
            },
            headerTintColor: VARIABLES.clrWhite,
            cardStyle: {
                backgroundColor: VARIABLES.clrBgDark,
            },
        })}
    >
      <Stack.Screen name="User" component={User} options={{headerTitle: 'Dashboard'}} />
      <Stack.Screen name="UserTasksDoing" component={UserTasksDoing} options={{headerTitle: 'My tasks : doing'}} />
      <Stack.Screen name="UserTasksToDo" component={UserTasksToDo} options={{headerTitle: 'My tasks : to do'}} />
    </Stack.Navigator>
    )
}

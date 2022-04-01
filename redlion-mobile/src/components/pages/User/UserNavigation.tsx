import * as React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import VARIABLES from '../../../../assets/styles/_variables';

import User from './User';
import UserTask from './Task/UserTask';
import UserTasksDoing from './Task/UserTasksDoing';
import UserTasksToDo from './Task/UserTasksToDo';

export default function UserNavigation() {

    const Stack = createStackNavigator();

    const forFade = (current: any) => ({
        cardStyle: {
            opacity: current.progress,
        },
    });

    return (
        <View style={{flex: 1, backgroundColor: VARIABLES.clrBgDark}}>
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
                <Stack.Screen name="User" component={User} options={{headerTitle: 'Dashboard', cardStyleInterpolator: forFade}} />
                <Stack.Screen name="UserTask" component={UserTask} options={{headerTitle: 'User task', cardStyleInterpolator: forFade}} />
                <Stack.Screen name="UserTasksDoing" component={UserTasksDoing} options={{headerTitle: 'My tasks : doing', cardStyleInterpolator: forFade}} />
                <Stack.Screen name="UserTasksToDo" component={UserTasksToDo} options={{headerTitle: 'My tasks : to do', cardStyleInterpolator: forFade}} />
            </Stack.Navigator>
        </View>
    )
}

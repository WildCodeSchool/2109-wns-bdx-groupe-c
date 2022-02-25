import React from 'react';
import { View, Text, StyleSheet  } from 'react-native';
import { Appbar, Button, Menu, Divider, Provider } from 'react-native-paper';
import Ionicons from "@expo/vector-icons/Ionicons";

import VARIABLES from '../../assets/styles/_variables';

export default function Home({ navigation }) {

  const [tasksDoingVisible, setTasksDoingVisible] = React.useState(false); // HomeCard 1 : Tasks > Doing ===> menu hide/off
  const [tasksToDoVisible, setTasksToDoVisible] = React.useState(false); // HomeCard 2 : Tasks > To do ===> menu hide/off
  const [projectsVisible, setProjectsVisible] = React.useState(false); // HomeCard 3 : Projects ===> menu hide/off

  const styles = StyleSheet.create({
    homeContainer: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: VARIABLES.clrBgDark
    },
    homeCard: {
      width: VARIABLES.windowWidth - 20,
      marginVertical: 10,
      backgroundColor: VARIABLES.clrScnd,
      borderRadius: 18,
      shadowColor: VARIABLES.clrBlack,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.32,
      shadowRadius: 5.46,
      elevation: 9,
    },
    homeCardTop: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    homeCardTopColor: {
      height: 15,
      width: '70%',
      borderTopLeftRadius: 18,
      borderBottomRightRadius: 18,
    },
    homeCardTopColorDoing: {
      backgroundColor: VARIABLES.clrTag4,
    },
    homeCardTopColorToDo: {
      backgroundColor: VARIABLES.clrTag2,
    },
    homeCardTopColorProjects: {
      backgroundColor: VARIABLES.clrTag3,
    },
    homeCardIcon: {
      fontSize: 20,
      color: VARIABLES.clrWhite,
    },
    homeCardName: {
      paddingHorizontal: 10,
      color: VARIABLES.clrWhite,
    },
    homeCardBody: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      color: VARIABLES.clrWhite,
    },
    homeCardBodyText: {
      color: VARIABLES.clrWhite,
    },
    homeCardMenu: {
      backgroundColor: VARIABLES.clrBgDark,
      borderRadius: 12,
      color: 'red'
    },
    homeCardMenuTitle: {
      color: VARIABLES.clrWhite,
    },
  });

  return (
    <View style={styles.homeContainer}>
      <View style={styles.homeCard}>
        <View style={[styles.homeCardTopColor, styles.homeCardTopColorDoing]}></View>
        <View style={styles.homeCardTop}>
          <Ionicons name={'folder-open'} style={styles.homeCardIcon} />
          <Text style={styles.homeCardName}>Tasks : Doing</Text>
        </View>
        <View style={styles.homeCardBody}>
          <Text style={styles.homeCardBodyText}>Vous avez 5 tâches en cours</Text>
          <Menu
            contentStyle={styles.homeCardMenu}
            visible={tasksDoingVisible}
            onDismiss={() => {setTasksDoingVisible(!tasksDoingVisible)}}
            anchor={<Appbar.Action icon={'dots-horizontal'} color={VARIABLES.clrWhite} onPress={() => {setTasksDoingVisible(!tasksDoingVisible)}} />}>
            <Menu.Item onPress={() => {}} title="Mes tâches en cours" titleStyle={styles.homeCardMenuTitle} />
            <Divider />
            <Menu.Item onPress={() => {}} title="Tout voir" titleStyle={styles.homeCardMenuTitle} />
          </Menu>
        </View>
      </View>
      <View style={styles.homeCard}>
        <View style={[styles.homeCardTopColor, styles.homeCardTopColorToDo]}></View>
        <View style={styles.homeCardTop}>
          <Ionicons name={'folder-open'} style={styles.homeCardIcon} />
          <Text style={styles.homeCardName}>Tasks : To do</Text>
        </View>
        <View style={styles.homeCardBody}>
          <Text style={styles.homeCardBodyText}>Vous avez 15 tâches à faire</Text>
          <Menu
            contentStyle={styles.homeCardMenu}
            visible={tasksToDoVisible}
            onDismiss={() => {setTasksToDoVisible(!tasksToDoVisible)}}
            anchor={<Appbar.Action icon={'dots-horizontal'} color={VARIABLES.clrWhite} onPress={() => {setTasksToDoVisible(!tasksToDoVisible)}} />}>
            <Menu.Item onPress={() => {}} title="Mes tâches à faire" titleStyle={styles.homeCardMenuTitle} />
            <Divider />
            <Menu.Item onPress={() => {}} title="Tout voir" titleStyle={styles.homeCardMenuTitle} />
          </Menu>
        </View>
      </View>
      <View style={styles.homeCard}>
        <View style={[styles.homeCardTopColor, styles.homeCardTopColorProjects]}></View>
        <View style={styles.homeCardTop}>
          <Ionicons name={'folder-open'} style={styles.homeCardIcon} />
          <Text style={styles.homeCardName}>Projects</Text>
        </View>
        <View style={styles.homeCardBody}>
          <Text style={styles.homeCardBodyText}>Vous avez 4 projets en cours</Text>
          <Menu
            contentStyle={styles.homeCardMenu}
            visible={projectsVisible}
            onDismiss={() => {setProjectsVisible(!projectsVisible)}}
            anchor={<Appbar.Action icon={'dots-horizontal'} color={VARIABLES.clrWhite} onPress={() => {setProjectsVisible(!projectsVisible)}} />}>
            <Menu.Item onPress={() => {}} title="Mes projets" titleStyle={styles.homeCardMenuTitle}  />
            <Divider />
            <Menu.Item onPress={() => {navigation.navigate('Projects', {}), setProjectsVisible(!projectsVisible)} } title="Tout voir" titleStyle={styles.homeCardMenuTitle} />
            <Divider />
            <Menu.Item onPress={() => {}} title="Créer un projet" titleStyle={styles.homeCardMenuTitle} />
          </Menu>
        </View>
      </View>
    </View>
  );
}
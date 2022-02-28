import React from 'react';
import { View, Text  } from 'react-native';
import { Appbar, Menu, Divider } from 'react-native-paper';
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';

import VARIABLES from '../../../assets/styles/_variables';

import UserDashboardCardStyles from '../../../assets/styles/UserDashboardCardStyle';

const navigation = useNavigation();

export default function UserDashboardCardProject () {
  
  const [projectsVisible, setProjectsVisible] = React.useState(false); // HomeCard 3 : Projects ===> menu hide/off
  
  return (
    <View style={UserDashboardCardStyles.homeCard}>
      <View style={[UserDashboardCardStyles.homeCardTopColor, UserDashboardCardStyles.homeCardTopColorProjects]}></View>
      <View style={UserDashboardCardStyles.homeCardTop}>
        <Ionicons name={'folder-open'} style={UserDashboardCardStyles.homeCardIcon} />
        <Text style={UserDashboardCardStyles.homeCardName}>Projects</Text>
      </View>
      <View style={UserDashboardCardStyles.homeCardBody}>
        <Text style={UserDashboardCardStyles.homeCardBodyText}>Vous avez 4 projets en cours</Text>
        <Menu
          contentStyle={UserDashboardCardStyles.homeCardMenu}
          visible={projectsVisible}
          onDismiss={() => {setProjectsVisible(!projectsVisible)}}
          anchor={<Appbar.Action icon={'dots-horizontal'} color={VARIABLES.clrWhite} onPress={() => {setProjectsVisible(!projectsVisible)}} />}>
          <Menu.Item onPress={() => {}} title="Mes projets" titleStyle={UserDashboardCardStyles.homeCardMenuTitle}  />
          <Divider />
          {/* <Menu.Item onPress={() => {navigation.navigate('ProjectDashboard', {}), setProjectsVisible(!projectsVisible)} } title="Tout voir" titleStyle={UserDashboardCardStyles.homeCardMenuTitle} />
          <Divider /> */}
          <Menu.Item onPress={() => {}} title="Créer un projet" titleStyle={UserDashboardCardStyles.homeCardMenuTitle} />
        </Menu>
      </View>
    </View>
  )
}

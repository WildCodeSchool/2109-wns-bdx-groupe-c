import React from 'react';
import { View, Text, ActivityIndicator  } from 'react-native';
import { Appbar, Menu, Divider } from 'react-native-paper';
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@apollo/client';

import { Projects_projects } from '../../../schemaTypes';
import { GET_PROJECTS_BY_STATUS_AND_USER } from '../../../queries/project';

import VARIABLES from '../../../../assets/styles/_variables';
import COMPONENTS from '../../../../assets/styles/_components';

export default function UserDashboardCardProject ({ userId = 3 , statusName = 'In Progress' }) {
  
  const navigation = useNavigation();
  const [projectsVisible, setProjectsVisible] = React.useState(false); // HomeCard 3 : Projects ===> menu hide/off

  const { loading, error, data } = useQuery<Projects_projects>(GET_PROJECTS_BY_STATUS_AND_USER, {
    variables: { userId, statusName },
  });
  
  return (
    <View style={COMPONENTS.homeCard}>
      <View style={[COMPONENTS.homeCardTopColor, COMPONENTS.homeCardTopColorProjects]}></View>
      <View style={COMPONENTS.homeCardTop}>
        <Ionicons name={'folder-open'} style={COMPONENTS.homeCardIcon} />
        <Text style={COMPONENTS.homeCardName}>Projects</Text>
      </View>
      {loading ? <ActivityIndicator/> : null}
      {data &&
        <View style={COMPONENTS.homeCardBody}>
          <Text style={[COMPONENTS.homeCardBodyText, {marginBottom: 0}]}>
            Vous avez {data.myProjects.length} projets en cours</Text>
          <Menu
            contentStyle={COMPONENTS.menuBlock}
            visible={projectsVisible}
            onDismiss={() => {setProjectsVisible(!projectsVisible)}}
            anchor={<Appbar.Action icon={'dots-horizontal'} color={VARIABLES.clrWhite} onPress={() => {setProjectsVisible(!projectsVisible)}} />}>
            <Menu.Item onPress={() => {navigation.navigate('ProjectNavigation', {screen: 'Projects'}), setProjectsVisible(!projectsVisible)} } title="Tout voir" titleStyle={COMPONENTS.menuTitle} />
            <Divider />
            <Menu.Item onPress={() => {navigation.navigate('ProjectNavigation', {screen: 'ProjectCreate'}), {}, setProjectsVisible(!projectsVisible)}} title="Créer un projet" titleStyle={COMPONENTS.menuTitle} />
          </Menu>
        </View>
      }
    </View>
  )
}

import * as React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useQuery } from "@apollo/client";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ProgressBar, Switch } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { Projects as ProjectsType } from "../../../schemaTypes";
import { GET_PROJECTS } from '../../../queries/project';

import VARIABLES from '../../../../assets/styles/_variables';
import COMPONENTS from '../../../../assets/styles/_components';
import useMyProjects from '../../customHook/userMyProjects';

const styles = StyleSheet.create({
  userProjectsContainer: {
    
  },
  allProjectsContainer: {

  },
  projectsSwitchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '60%',
  },
  projectsSwitchText: {
    color: VARIABLES.clrWhite,
  }

});

export default function Projects(route: any) {

  const navigation = useNavigation();

  const [userProjects, loadingUserProjects] = useMyProjects();

  const {loading, data} = useQuery<ProjectsType>(GET_PROJECTS);

  const [isUserProjectsActive, setIsUserProjectsActive] = React.useState(true);
  const [isAllProjectsActive, setIsAllProjectsActive] = React.useState(false);

  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    setIsUserProjectsActive(!isUserProjectsActive)
    setIsAllProjectsActive(!isAllProjectsActive)
  }

  const UserProjects = () => {
    return (
      <>
        {loadingUserProjects && <Text>Loading...</Text>}
        {userProjects &&
          <FlatList
          data = {userProjects}
          keyExtractor={(project) => project.id}
          renderItem={(project) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('Project', {projectId: project.item.id, projectName: project.item.project.name})}
                activeOpacity={.8}
              >
                <View style={COMPONENTS.projectCard}>
                  <View style={COMPONENTS.projectCardTopColor}></View>
                  <View style={COMPONENTS.projectCardTop}>
                    <Ionicons name={'folder-open-outline'} color={VARIABLES.clrWhite} size={20} />
                    <Text style={COMPONENTS.projectCardName}>{project.item.project.name}</Text>
                  </View>
                  <View style={COMPONENTS.projectCardBody}>
                    <Text style={COMPONENTS.projectCardDescription}>{project.item.project.shortText}</Text>
                    <Text style={COMPONENTS.projectCardLanguages}>{project.item.project.description}</Text>
                  </View>
                  <View style={COMPONENTS.projectCardBottom}>
                    <Text style={COMPONENTS.projectCardProgress}>50%</Text>
                    <ProgressBar progress={0.5} color={VARIABLES.clrThrd} style={COMPONENTS.projectCardProgressBar} />
                  </View>
                </View>
              </TouchableOpacity>
            )}
          }
          />
        }
      </>
    )
  }

  const AllProjects = () => {
    return (
      <>
        {loading && <Text>Loading...</Text>}
        {data &&
          <FlatList
          data = {data.projects}
          keyExtractor={(project) => project.id}
          renderItem={(project) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('Project', {projectId: project.item.id, projectName: project.item.name})}
                activeOpacity={.8}
              >
                <View style={COMPONENTS.projectCard}>
                  <View style={COMPONENTS.projectCardTopColor}></View>
                  <View style={COMPONENTS.projectCardTop}>
                    <Ionicons name={'folder-open-outline'} color={VARIABLES.clrWhite} size={20} />
                    <Text style={COMPONENTS.projectCardName}>{project.item.name}</Text>
                  </View>
                  <View style={COMPONENTS.projectCardBody}>
                    <Text style={COMPONENTS.projectCardDescription}>{project.item.shortText}</Text>
                    <Text style={COMPONENTS.projectCardLanguages}>{project.item.description}</Text>
                  </View>
                  <View style={COMPONENTS.projectCardBottom}>
                    <Text style={COMPONENTS.projectCardProgress}>50%</Text>
                    <ProgressBar progress={0.5} color={VARIABLES.clrThrd} style={COMPONENTS.projectCardProgressBar} />
                  </View>
                </View>
              </TouchableOpacity>
            )}
          }
          />
        }
    </>
    )
  }

  return (
    <View style={COMPONENTS.projectsContainer}>

      <View style={styles.projectsSwitchContainer}>
        <Text style={styles.projectsSwitchText}>My projects</Text>
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
        <Text style={styles.projectsSwitchText}>All projects</Text>
      </View>

      {isUserProjectsActive && (<UserProjects></UserProjects>)}
      {isAllProjectsActive && (<AllProjects></AllProjects>)}

    </View>
  );
}
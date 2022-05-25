import * as React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import { ProgressBar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import VARIABLES from '../../../../assets/styles/_variables';
import COMPONENTS from '../../../../assets/styles/_components';
import useMyProjects from '../../customHook/userMyProjects';

export default function ProjectsUser(route: any) {

  const navigation = useNavigation();

  const [userProjects, loadingUserProjects] = useMyProjects();

  return (
    <View style={COMPONENTS.projectsContainer}>
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
    </View>
  );
}
import * as React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ProgressBar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { Projects as ProjectsType } from "../../../schemaTypes";

import VARIABLES from '../../../../assets/styles/_variables';
import COMPONENTS from '../../../../assets/styles/_components';

const styles = StyleSheet.create({

});

export default function Projects(route: any) {

  const GET_PROJECTS = gql`
  query Projects {
    projects {
      id
      name
      shortText
      description
      initialTimeSpent
      createdAt
      updatedAt
    }
  }
  `;

  const { loading, error, data } = useQuery<ProjectsType>(GET_PROJECTS);

  const navigation = useNavigation();

  return (
    <View style={COMPONENTS.projectsContainer}>
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
    </View>
  );
}
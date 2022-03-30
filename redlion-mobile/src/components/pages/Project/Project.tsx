import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { Projects_projects } from "../../../schemaTypes";
import VARIABLES from '../../../../assets/styles/_variables';
import Ionicons from "@expo/vector-icons/Ionicons";
import { ProgressBar } from 'react-native-paper';

import COMPONENTS from '../../../../assets/styles/_components';

export default function Project (route: any) {

  console.log('route', route);

  const { projectId } = route.route.params;

  const GET_PROJECT = gql`
    query Project($projectId: Float!) {
      project(id: $projectId) {
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


  const { loading, error, data } = useQuery<Projects_projects>(GET_PROJECT, {
    variables: {projectId: parseInt(projectId)},
  });

  return (
    <View style={COMPONENTS.projectsContainer}>
      {loading ? <ActivityIndicator /> : null}
      {data &&
        <TouchableOpacity onPress={() => console.log('true')}>
          <View style={COMPONENTS.projectCard}>
            <View style={COMPONENTS.projectCardTopColor}></View>
            <View style={COMPONENTS.projectCardTop}>
            <Ionicons name={'folder-open-outline'} color={VARIABLES.clrWhite} size={20} />
            <Text style={COMPONENTS.projectCardName}>Subject : {data.project.id}</Text>
            </View>
            <View style={COMPONENTS.projectCardBody}>
            <Text style={COMPONENTS.projectCardDescription}>OneTwo</Text>
            <Text style={COMPONENTS.projectCardLanguages}>OneTwo</Text>
            </View>
            <View style={COMPONENTS.projectCardBottom}>
            <Text style={COMPONENTS.projectCardProgress}>50%</Text>
            <ProgressBar progress={0.5} color={VARIABLES.clrThrd} style={COMPONENTS.projectCardProgressBar} />
            </View>
          </View>
        </TouchableOpacity>
      }
    </View>
  );
}
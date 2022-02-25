import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { Project } from "../schemaTypes";
import VARIABLES from '../../assets/styles/_variables';
import Ionicons from "@expo/vector-icons/Ionicons";
import { ProgressBar } from 'react-native-paper';

import ProjectDashboardCardStyle from '../../assets/styles/components/ProjectDasboardCardStyle';

export default function ProjectDashboard () {

  const GET_WILDERS = gql`
    query Project {
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
  
  const { loading, error, data } = useQuery<Project>(GET_WILDERS);

  const styles = StyleSheet.create({
    projectsContainer: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: VARIABLES.clrBgDark
    },
  });

  return (
    <View style={styles.projectsContainer}>
        <View style={ProjectDashboardCardStyle.projectCard}>
            <View style={ProjectDashboardCardStyle.projectCardTopColor}></View>
            <View style={ProjectDashboardCardStyle.projectCardTop}>
            <Ionicons name={'folder-open-outline'} color={VARIABLES.clrWhite} size={20} />
            <Text style={ProjectDashboardCardStyle.projectCardName}>OneTwo</Text>
            </View>
            <View style={ProjectDashboardCardStyle.projectCardBody}>
            <Text style={ProjectDashboardCardStyle.projectCardDescription}>OneTwo</Text>
            <Text style={ProjectDashboardCardStyle.projectCardLanguages}>OneTwo</Text>
            </View>
            <View style={ProjectDashboardCardStyle.projectCardBottom}>
            <Text style={ProjectDashboardCardStyle.projectCardProgress}>50%</Text>
            <ProgressBar progress={0.5} color={VARIABLES.clrThrd} style={ProjectDashboardCardStyle.projectCardProgressBar} />
            </View>
        </View>
    </View>
  );
}
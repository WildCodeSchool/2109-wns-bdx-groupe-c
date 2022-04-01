import * as React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { Projects_projects } from "../../../../schemaTypes";

import VARIABLES from '../../../../../assets/styles/_variables';
import ProjectUpdateSectionStyles from '../../../organisms/Project/ProjectUpdateSection';

const STYLES = ProjectUpdateSectionStyles;

const styles = StyleSheet.create({
    list: {
      display: 'flex',
      flexDirection: 'column',
      padding: 10,
      marginBottom: 15,
      backgroundColor: 'transparent',
    },
    title: {
      paddingBottom: 5,
    }
})

export default function ProjectInformationsUpdate (route: any) {
    
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
        createdBy {
          firstName
          lastName
        }
        status {
          name
        }
      }
    }
    `;
    
    const { loading, error, data } = useQuery<Projects_projects>(GET_PROJECT, {
    variables: {projectId: parseInt(projectId)},
    });

    return (
      <View style={STYLES.container}>
        {loading ? <ActivityIndicator /> : null}
        {data &&
        <>
          <View style={[STYLES.list, styles.list]}>
              <Text style={[STYLES.text, styles.title]}>Name</Text>
              <Text style={[STYLES.text]}>{data.project.name}</Text>
          </View>
          <View style={[STYLES.list, styles.list]}>
              <Text style={[STYLES.text, styles.title]}>Short text</Text>
              <Text style={[STYLES.text]}>{data.project.shortText}</Text>
          </View>
          <View style={[STYLES.list, styles.list]}>
              <Text style={[STYLES.text, styles.title]}>Description</Text>
              <Text style={[STYLES.text]}>{data.project.description}</Text>
          </View>
          <View style={[STYLES.list, styles.list]}>
              <Text style={[STYLES.text, styles.title]}>Status</Text>
              <Text style={[STYLES.text]}>{data.project.status.name}</Text>
          </View>
          <View style={[STYLES.list, styles.list]}>
              <Text style={[STYLES.text, styles.title]}>Created at</Text>
              <Text style={[STYLES.text]}>{data.project.createdAt}</Text>
          </View>
        </>
        }
      </View>
    )
}
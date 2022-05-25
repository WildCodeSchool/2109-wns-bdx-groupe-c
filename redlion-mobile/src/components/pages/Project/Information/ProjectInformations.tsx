import * as React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useQuery } from "@apollo/client";

import { Projects_projects } from '../../../../schemaTypes';
import { GET_PROJECT_ALL } from '../../../../queries/project';

import ProjectSectionStyles from '../../../organisms/Project/ProjectSection';
import VARIABLES from '../../../../../assets/styles/_variables';

const STYLES = ProjectSectionStyles;

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
    ,
    input: {
      height: 60,
      maxHeight: 60,
      minWidth: '100%',
      marginBottom: 20,
      backgroundColor: VARIABLES.clrBgDark,
      borderRadius: 18,
    },
    button: {
        marginVertical: 40,
    },
    buttonContent: {
        backgroundColor: VARIABLES.clrThrd,
    },
    infoBox: {
      flexWrap: 'wrap',
      height: 60,
      maxHeight: 60,
      minWidth: '100%',
      maxWidth: '100%',
      marginBottom: 20,
      backgroundColor: VARIABLES.clrBgDark,
      borderRadius: 18,
    },
})

export default function ProjectInformations (route: any) {
    
    const { projectId } = route.route.params;

    const { loading, error, data } = useQuery<Projects_projects>(GET_PROJECT_ALL, {
      variables: {projectId: parseInt(projectId)},
    });

    return (
      <View style={STYLES.container}>
        {loading ? <ActivityIndicator /> : null}
        {data &&
        <>
          <View style={[STYLES.list, styles.list]}>
              <Text style={[STYLES.text, styles.title, {color: VARIABLES.clrThrd}]}>Name</Text>
              <Text style={[STYLES.text]}>{data.project.name}</Text>
          </View>

          <View style={[STYLES.list, styles.list]}>
              <Text style={[STYLES.text, styles.title, {color: VARIABLES.clrThrd}]}>Short text</Text>
              <Text style={[STYLES.text]}>{data.project.shortText}</Text>
          </View>

          <View style={[STYLES.list, styles.list]}>
              <Text style={[STYLES.text, styles.title, {color: VARIABLES.clrThrd}]}>Description</Text>
              <Text style={[STYLES.text]}>{data.project.description}</Text>
          </View>

          <View style={[STYLES.list, styles.list]}>
              <Text style={[STYLES.text, styles.title, {color: VARIABLES.clrThrd}]}>Status</Text>
              <Text style={[STYLES.text]}>{data.project.status.name}</Text>
          </View>

          <View style={[STYLES.list, styles.list]}>
              <Text style={[STYLES.text, styles.title, {color: VARIABLES.clrThrd}]}>Created at</Text>
              <Text style={[STYLES.text]}>{data.project.createdAt}</Text>
          </View>
        </>
        }
      </View>
    )
}
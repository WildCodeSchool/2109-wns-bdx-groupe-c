import React from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { Project } from "../schemaTypes";
import VARIABLES from '../../assets/styles/_variables';
import Ionicons from "@expo/vector-icons/Ionicons";
import { ProgressBar } from 'react-native-paper';

export default function Projects({ navigation }) {

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
    projectCard: {
      flex: 1,
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
    projectCardTopColor: {
      backgroundColor: '#1AE46B',
      height: 15,
      width: '70%',
      borderTopLeftRadius: 18,
      borderBottomRightRadius: 18,
    },
    projectCardTop: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      flexDirection: 'row',
      alignItems: 'center',
    },
    projectCardName: {
      paddingHorizontal: 10,
      color: VARIABLES.clrWhite,
      fontWeight: 'bold',
    },
    projectCardBody: {
     paddingBottom: 5,
     paddingHorizontal: 10,
    },
    projectCardDescription: {
      marginVertical: 5,
      color: VARIABLES.clrWhite,
    },
    projectCardLanguages: {
      paddingVertical: 5,
      color: VARIABLES.clrWhite,
    },
    projectCardBottom: {
      paddingVertical: 5,
      marginHorizontal: 10,
    },
    projectCardProgress: {
      color: VARIABLES.clrWhite,
    },
    projectCardProgressBar: {
      height: 6,
      width: '100%',
      marginVertical: 5,
      backgroundColor: 'white',
      borderColor: 'transparent',
      borderRadius: 8
    },
  });

  return (
    <View style={styles.projectsContainer}>
      {loading && <Text>Loading...</Text>}
      {data &&
        <FlatList
        data = {data.projects}
        keyExtractor={(project) => project.id}
        renderItem={(project) => {
          return (
            <View style={styles.projectCard}>
              <View style={styles.projectCardTopColor}></View>
              <View style={styles.projectCardTop}>
                <Ionicons name={'folder-open-outline'} color={VARIABLES.clrWhite} size={20} />
                <Button title='click me' onPress={() => navigation.navigate('Tasks', {projectId: project.item.id})} />
                <Text style={styles.projectCardName}>{project.item.name}</Text>
              </View>
              <View style={styles.projectCardBody}>
                <Text style={styles.projectCardDescription}>{project.item.shortText}</Text>
                <Text style={styles.projectCardLanguages}>{project.item.description}</Text>
              </View>
              <View style={styles.projectCardBottom}>
                <Text style={styles.projectCardProgress}>50%</Text>
                <ProgressBar progress={0.5} color={VARIABLES.clrThrd} style={styles.projectCardProgressBar} />
              </View>
            </View>
          )}
        }
        />
      }
    </View>
  );
}
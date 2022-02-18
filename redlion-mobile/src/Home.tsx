import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Button } from 'react-native';
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { Project } from "./schemaTypes";

export default function Home({ navigation }) {

  const GET_PROJECTS = gql`
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


  const { loading, error, data }= useQuery<Project>(GET_PROJECTS);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    projectContainer: {
      flex: 1,
      height: 200,
      width: 200,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'blue',
    },
    item: {
      backgroundColor: '#f9c2ff',
    },
  });

  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator /> : null}

      {data &&
        <FlatList
        data = {data.projects}
        keyExtractor={(project) => project.id}
        renderItem={(project) => {
          return (
            <View style={styles.projectContainer}>
              <Text style={styles.item}>
                {project.item.name}
              </Text>
              <Button
                title="See Tasks"
                onPress={() =>
                navigation.navigate('Tasks', {projectId: project.item.id})
              }
            />
            </View>
          )}
        }
      />
      }
    </View>
  );
}
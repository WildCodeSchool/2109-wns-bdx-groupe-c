import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { Project } from "./schemaTypes";

export default function Home() {

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


  const { loading, error, data }= useQuery<Project>(GET_WILDERS);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'yellow',
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

  console.log('loading', loading);
  console.log('error', error);
  console.log('data', data);

  return (
    <View style={styles.container}>
      {loading && <Text>Loading...</Text>}

      {data &&
        <FlatList
        data = {data.projects}
        keyExtractor={(project) => project.id}
        renderItem={(project) => {
          console.log(project);
          return (
            <View style={styles.projectContainer}>
              <Text style={styles.item}>
                {project.item.name}
              </Text>
            </View>
          )}
        }
      />
      }
    </View>
  );
}
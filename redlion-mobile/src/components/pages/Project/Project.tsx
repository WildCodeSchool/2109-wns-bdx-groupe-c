import React from 'react';
import { View, Text, ActivityIndicator, FlatList, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Appbar, Divider, Menu, ProgressBar } from 'react-native-paper';
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import Ionicons from "@expo/vector-icons/Ionicons";

import { Projects_projects } from "../../../schemaTypes";

import VARIABLES from '../../../../assets/styles/_variables';
import COMPONENTS from '../../../../assets/styles/_components';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  project: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
  },
  width: {
    width: VARIABLES.windowWidth - 20,
  },
  rowBlock: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
    padding: 10,
  },
  columnBlock: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 10,
    padding: 10,
  },
  projectTitle: {
    marginBottom: 5,
    color: VARIABLES.clrWhite,
  },
  informations: {
    borderWidth: 1,
    borderRadius: 18,
    borderColor: VARIABLES.clrTag2,
  },
  users: {
    borderWidth: 1,
    borderRadius: 18,
    borderColor: VARIABLES.clrTag1,
  },
  languages: {
    borderWidth: 1,
    borderRadius: 18,
    borderColor: VARIABLES.clrTag3,
  },
  languagesList: {
    display: 'flex',
    flexDirection: 'row',
  },
  language: {
    marginRight: 15,
    color: VARIABLES.clrWhite,
  },
  tasks: {
    borderWidth: 1,
    borderColor: VARIABLES.clrTag4,
    borderRadius: 18,
  },
  tasksList: {
    display: 'flex',
    flexDirection: 'column',
  },
  task: {
    marginBottom: 5,
    color: VARIABLES.clrWhite,
  }
})

export default function Project (route: any) {

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
        languages {
          id
          name
        }
        tasks {
          id
          subject
          shortText
          description
        }
        status {
          name
        }
      }
    }
  `;

  const navigation = useNavigation();

  const { loading, error, data } = useQuery<Projects_projects>(GET_PROJECT, {
    variables: {projectId: parseInt(projectId)},
  });

  const [menuTask, setMenuTask] = React.useState(false);


  return (
    <ScrollView>
      {loading ? <ActivityIndicator /> : null}
      {data &&
          <View style={styles.project}>

              {/* --- INFORMATIONS --- */}
            <View style={[styles.columnBlock, styles.width, styles.informations]}>
              <View style={[styles.rowBlock, {padding: 0}]}>
                <Ionicons name={'folder-open-outline'} color={VARIABLES.clrTag2} size={20} />
                <Text style={[styles.projectTitle, {marginLeft: 10, color: VARIABLES.clrTag2}]}>Informations</Text>
              </View>

              <View style={[styles.columnBlock, styles.width, {padding: 0}]}>
                <Text style={styles.projectTitle}>{data.project.shortText}</Text>
              </View>
              
              <View style={[styles.columnBlock, styles.width, {padding: 0}]}>
                <Text style={styles.projectTitle}>{data.project.description}</Text>
              </View>
              
              <View style={[styles.columnBlock, styles.width, {padding: 0}]}>
                <Text style={styles.projectTitle}>Time spent : {data.project.initialTimeSpent}</Text>
              </View>

              <View style={[styles.columnBlock, styles.width, {padding: 0}]}>
                <Text style={styles.projectTitle}>Progression : 50%</Text>
                <ProgressBar progress={0.5} color={VARIABLES.clrThrd} style={[COMPONENTS.projectCardProgressBar, {width:'90%'}]} />
              </View>
            </View>

            {/* --- USERS --- */}
            <View style={[styles.columnBlock, styles.width, styles.users]}>
              <View style={[styles.rowBlock, {padding: 0}]}>
                <Ionicons name={'folder-open-outline'} color={VARIABLES.clrTag1} size={20} />
                <Text style={[styles.projectTitle, {marginLeft: 10, color: VARIABLES.clrTag1}]}>Users</Text>
              </View>
              <Text style={[styles.projectTitle, {padding: 0}]}>
                Created by : {data.project.createdBy.firstName} {data.project.createdBy.lastName}
              </Text> 
            </View>

            {/* --- LANGUAGES --- */}
            <View style={[styles.columnBlock, styles.width, styles.languages]}>
              <View style={[styles.rowBlock, {padding: 0}]}>
                <Ionicons name={'folder-open-outline'} color={VARIABLES.clrTag3} size={20} />
                <Text style={[styles.projectTitle, {marginLeft: 10, color: VARIABLES.clrTag3}]}>Languages</Text>
              </View>
              <View style={[styles.rowBlock, {padding:0}]}>
                <Text style={styles.projectTitle}>Count : </Text>
                <Text style={styles.projectTitle}>{data.project.languages.length}</Text>
              </View>
              <FlatList
                data = {data.project.languages.slice(0,20)}
                keyExtractor={(language) => language.id}
                contentContainerStyle={styles.languagesList}
                scrollEnabled={true}
                horizontal={true}
                renderItem={(language) => {
                  return (
                    <>
                      <Text style={styles.language}>{language.item.name}</Text>
                    </> 
                  )}
                }/>
            </View>

            {/* --- TASKS --- */}
            <View style={[styles.columnBlock, styles.width, styles.tasks]}>
              <View style={[styles.rowBlock, {padding: 0, alignItems: 'center', justifyContent: 'space-between'}]}>
                <View style={[styles.rowBlock, {padding: 0}]}>
                  <Ionicons name={'folder-open-outline'} color={VARIABLES.clrTag4} size={20} />
                  <Text style={[styles.projectTitle, {marginLeft: 10, color: VARIABLES.clrTag4}]}>Tasks</Text>
                </View>
                <Menu
                  contentStyle={[COMPONENTS.menuBlock, {backgroundColor: VARIABLES.clrTag4}]}
                  visible={menuTask}
                  onDismiss={() => {setMenuTask(!menuTask)}}
                  anchor={<Appbar.Action icon={'dots-horizontal'} color={VARIABLES.clrTag4} style={{margin: 0}} onPress={() => {setMenuTask(!menuTask)}} />}>
                  <Menu.Item
                    onPress={() => {
                      navigation.navigate('Project', {screen: 'ProjectTasks', params: {projectId: data.project.id, name: data.project.name}})
                    }}
                    title="Tout voir"
                    titleStyle={[COMPONENTS.menuTitle]} />
                  <Divider />
                  <Menu.Item onPress={() => {}} title="Créer une tâche" titleStyle={[COMPONENTS.menuTitle]} />
                </Menu>
              </View>
              <View style={[styles.rowBlock, {padding: 0}]}>
                <Text style={styles.projectTitle}>Count : {data.project.tasks.length}</Text>
              </View>
              <FlatList
                data = {data.project.tasks.slice(0,20)}
                keyExtractor={(task) => task.id}
                contentContainerStyle={styles.tasksList}
                scrollEnabled={true}
                horizontal={true}
                renderItem={(task) => {
                  return (
                    <TouchableOpacity
                    onPress={() => {console.log(true)}}
                    activeOpacity={.8}
                  >
                      <Text style={styles.task}>{task.item.subject}</Text>
                    </TouchableOpacity> 
                  )}
                }/> 
            </View>

          </View>
      }
    </ScrollView>
  );
}
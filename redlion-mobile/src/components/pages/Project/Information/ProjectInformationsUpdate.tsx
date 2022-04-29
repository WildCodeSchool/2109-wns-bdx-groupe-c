import * as React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useQuery } from "@apollo/client";

import { Projects_projects } from '../../../../schemaTypes';
import { GET_PROJECT_ALL } from '../../../../queries/project';

import ProjectInput from '../../../molecules/PojectInput';

import ProjectUpdateSectionStyles from '../../../organisms/Project/ProjectUpdateSection';
import VARIABLES from '../../../../../assets/styles/_variables';

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
})

export default function ProjectInformationsUpdate (route: any) {
    
    const { projectId } = route.route.params;

    const { loading, error, data } = useQuery<Projects_projects>(GET_PROJECT_ALL, {
      variables: {projectId: parseInt(projectId)},
    });

    const [inputName, setInputName] = React.useState("");
    const [inputShortText, setInputShortText] = React.useState("");
    const [inputDescription, setInputDescription] = React.useState("");
    const [inputStatus, setInputStatus] = React.useState("");

    return (
      <View style={STYLES.container}>
        {loading ? <ActivityIndicator /> : null}
        {data &&
        <>
          <ProjectInput props={{
            label: 'Name',
            project: data.project.name,
            value: inputName,
            setInputText: inputName => setInputName(inputName),
          }}/>
          {console.log('project name : ', data.project.name)}
          <ProjectInput props={{
            label: 'Short text',
            project: data.project.shortText,
            value: inputShortText,
            setInputText: inputShortText => setInputShortText(inputShortText),
          }}/>

          <ProjectInput props={{
            label: 'Description',
            project: data.project.description,
            value: inputDescription,
            setInputText: inputDescription => setInputDescription(inputDescription),
          }}/>

          <ProjectInput props={{
            label: 'Status',
            project: data.project.status.name,
            value: inputStatus,
            setInputText: inputStatus => setInputStatus(inputStatus),
          }}/>

          <View style={[STYLES.list, styles.list]}>
              <Text style={[STYLES.text, styles.title, {color: VARIABLES.clrThrd}]}>Created at</Text>
              <Text style={[STYLES.text]}>{data.project.createdAt}</Text>
          </View>
        </>
        }
      </View>
    )
}
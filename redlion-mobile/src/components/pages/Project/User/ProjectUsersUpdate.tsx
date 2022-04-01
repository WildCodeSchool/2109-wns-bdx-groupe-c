import * as React from 'react';
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { Projects_projects } from "../../../../schemaTypes";
import { Button } from 'react-native-paper';

import VARIABLES from '../../../../../assets/styles/_variables';
import ProjectUpdateSectionStyles from '../../../organisms/Project/ProjectUpdateSection';

const STYLES = ProjectUpdateSectionStyles;

const styles = StyleSheet.create({

})

export default function ProjectInformationsUpdate (route: any) {
    
    const { projectId, createdBy } = route.route.params;

    const GET_PROJECT = gql`
    query Project($projectId: Float!) {
      project(id: $projectId) {
        id
        name
        createdBy {
            firstName
            lastName
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
                <View style={[STYLES.list]}>
                    <View style={STYLES.listElement}>
                        <Text style={STYLES.text}>{data.project.createdBy.firstName} {data.project.createdBy.lastName}</Text>
                    </View>
                    <View style={STYLES.listElement}>
                        <Text style={STYLES.text}>User #2</Text>
                    </View>
                    <View style={STYLES.listElement}>
                        <Text style={STYLES.text}>User #3</Text>
                    </View>
                    <View style={STYLES.listElement}>
                        <Text style={STYLES.text}>User #4</Text>
                    </View>
                    <View style={STYLES.listElement}>
                        <Text style={STYLES.text}>User #5</Text>
                    </View>
                    <View style={STYLES.listElement}>
                        <Text style={STYLES.text}>User #6</Text>
                    </View>
                </View>
                <Button
                    color={VARIABLES.clrThrd}
                    style={[STYLES.button, {borderColor: VARIABLES.clrThrd}]}
                    contentStyle={STYLES.buttonContent}
                    onPress={() => {}} 
                >
                    Add user
                </Button>
            </>
            }
        </View>
    )
}
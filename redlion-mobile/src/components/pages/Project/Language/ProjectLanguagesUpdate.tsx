import * as React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { gql, useQuery } from '@apollo/client';

import { Projects_projects } from '../../../../schemaTypes';

import { GET_PROJECT_PART } from '../../../../queries/project';

import VARIABLES from '../../../../../assets/styles/_variables';
import ProjectUpdateSectionStyles from '../../../organisms/Project/ProjectUpdateSection';

const STYLES = ProjectUpdateSectionStyles;

const styles = StyleSheet.create({

})

export default function ProjectLanguagesUpdate(route: any) {

    const { projectId, projectName } = route.route.params;

    const { loading, error, data } = useQuery<Projects_projects>(GET_PROJECT_PART, {
        variables: {projectId: parseInt(projectId)},
    });

    return (
        <View style={STYLES.container}>
            {loading ? <ActivityIndicator /> : null}
            {data &&
            <>
                <FlatList
                    horizontal={false}
                    contentContainerStyle={STYLES.list}
                    data = {data.project.languages}
                    keyExtractor={(language) => language.id}
                    renderItem={(language) => {
                        return (
                            <View style={STYLES.listElement}>
                                <Text style={STYLES.text}>{language.item.name}</Text>
                            </View>
                        )
                    }}
                />
                <Button
                    color={VARIABLES.clrThrd}
                    style={[STYLES.button, {borderColor: VARIABLES.clrThrd}]}
                    contentStyle={STYLES.buttonContent}
                    onPress={() => {}} 
                >
                    Add language
                </Button>
            </>
            }
        </View>
    )
}

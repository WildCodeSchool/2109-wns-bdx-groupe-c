import * as React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { useQuery } from '@apollo/client';

import { Projects_projects } from '../../../../schemaTypes';
import { GET_PROJECT_PART } from '../../../../queries/project';

import ProjectSectionStyles from '../../../organisms/Project/ProjectSection';

const STYLES = ProjectSectionStyles;

export default function ProjectLanguages(route: any) {

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
            </>
            }
        </View>
    )
}

import * as React from 'react';
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useQuery } from "@apollo/client";

import { Projects_projects } from "../../../../schemaTypes";
import { GET_PROJECT_MORE } from '../../../../queries/project';

import ProjectSectionStyles from '../../../organisms/Project/ProjectSection';

const STYLES = ProjectSectionStyles;

export default function ProjectUsers (route: any) {
    
    const { projectId, createdBy } = route.route.params;

    const { loading, error, data } = useQuery<Projects_projects>(GET_PROJECT_MORE, {
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
                </View>
            </>
            }
        </View>
    )
}
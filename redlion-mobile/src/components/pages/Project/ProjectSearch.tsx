import {useMemo, useState}from 'react';
import { FlatList, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Searchbar, Text } from 'react-native-paper';
import { useQuery } from '@apollo/client';

import { Projects as ProjectsType, Projects_projects } from "../../../schemaTypes";
import { GET_PROJECTS } from '../../../queries/project';

import VARIABLES from '../../../../assets/styles/_variables';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        width: VARIABLES.windowWidth,
        height: 'auto',
    },
    searchbar: {
        width: VARIABLES.windowWidth - 20,
        backgroundColor: VARIABLES.clrShdwFrst,
        elevation: 50,
        zIndex: 50,
    },
    input: {
        color: '#fff'
    },
    icon: {
        color: '#fff',
    },
    list: {
        width: VARIABLES.windowWidth - 20,
        height: 'auto',
        marginTop: 10,
    },
    listItem: {
        padding: 10,
        marginVertical: 5,
        color: '#fff',
        backgroundColor: VARIABLES.clrShdwThrd,
        borderRadius: 4,
    },
})

export default function ProjectSearch() {

    const navigation = useNavigation();

    const [searchQuery, setSearchQuery] = useState('');

    const {loading, data} = useQuery<ProjectsType>(GET_PROJECTS);

    const projects: Projects_projects[] | null = useMemo(() => {
        if (data) {
            return data.projects
        } else {
            return null
        }
    }, [data]);

    //TODO ==> Verifier que projects c'est bien ce typage la

    const allProjects = Object.values(projects);

    const projectsFiltered:  Projects_projects[] | null = useMemo(() => {

        let search = searchQuery.toLowerCase(); 

        if (search === '' || search.length < 3) {
            return null;
        }

        for (let i = 0; i < allProjects.length; i++) {
            if (!allProjects[i].name.toLowerCase().startsWith(search)) {
                allProjects?.splice(i--, 1);
            }
        }

        return allProjects;

    }, [allProjects, searchQuery]);


    const onChange = (query: string) => {
        setSearchQuery(query);
    }

    return (
        <View style={styles.container}>
            <Searchbar
                style={[styles.searchbar]}
                placeholder={'Search'}
                value={searchQuery}
                onChangeText={(onChange)}
                onIconPress={() => {}}
                inputStyle={[styles.input]}
                selectionColor={'#fff'}
                iconColor={'#fff'}
                placeholderTextColor={'#fff'}
            />
            {loading && <Text>Loading...</Text>}
            {projectsFiltered && (
                <FlatList
                style={[styles.list]}
                data = {projectsFiltered}
                keyExtractor={(project) => project.id}
                extraData={searchQuery}
                renderItem={(project) => {
                    return (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Project', {projectId: project.item.id, projectName: project.item.name})}
                        activeOpacity={.6}
                    >
                        <Text style={[styles.listItem]}>{project.item.name}</Text>
                    </TouchableOpacity>
                    )}
                }
                />
            )}
        </View>
    )
}


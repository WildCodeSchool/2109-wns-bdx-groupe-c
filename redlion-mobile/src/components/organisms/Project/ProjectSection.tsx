import { StyleSheet } from 'react-native';

import VARIABLES from '../../../../assets/styles/_variables';

const ProjectSectionStyles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        padding: 10,
    },
    list: {
        width: VARIABLES.windowWidth - 20,
        flexDirection: 'row',
        paddingVertical: 10,
        borderWidth: 1,
        borderRadius: 18,
        borderColor: VARIABLES.clrThrd,
    },
    listElement: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        margin: 10,
        borderRadius: 12,
        backgroundColor: VARIABLES.clrShdwScnd,
    },
    text: {
        width: '100%',
        color: VARIABLES.clrWhite,
    },
    button: {
        position: 'absolute',
        bottom: 40,
        borderWidth: 1,
        borderColor: VARIABLES.clrThrd,
        borderRadius: 18,
    },
    buttonContent: {
        width: VARIABLES.windowWidth - 80,
        padding: 5,
    },
})

export default ProjectSectionStyles;

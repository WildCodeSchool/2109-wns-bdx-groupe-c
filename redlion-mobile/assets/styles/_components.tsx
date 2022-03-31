import { StyleSheet  } from 'react-native';

import VARIABLES from './_variables';

const _components = StyleSheet.create({
    // ----------
    // basic menu
    menuBlock: {
        backgroundColor: VARIABLES.clrScnd,
        borderRadius: 12,
        color: 'red',
        elevation: 75,
    },
    menuTitle: {
        color: VARIABLES.clrWhite,
    },
    
    // -------------------
    // dashboard-user card
    homeCard: {
        width: VARIABLES.windowWidth - 20,
        marginVertical: 10,
        backgroundColor: VARIABLES.clrShdwThrd,
        borderRadius: 18,
        shadowColor: VARIABLES.clrBlack,
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.48,
        shadowRadius: 11.95,
    },
    homeCardTop: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    homeCardTopColor: {
        height: 15,
        width: '70%',
        borderTopLeftRadius: 18,
        borderBottomRightRadius: 18,
    },
    homeCardTopColorDoing: {
        backgroundColor: VARIABLES.clrTag4,
    },
    homeCardTopColorToDo: {
        backgroundColor: VARIABLES.clrTag2,
    },
    homeCardTopColorProjects: {
        backgroundColor: VARIABLES.clrTag3,
    },
    homeCardIcon: {
        fontSize: 20,
        color: VARIABLES.clrWhite,
    },
    homeCardName: {
        paddingHorizontal: 10,
        color: VARIABLES.clrWhite,
    },
    homeCardBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        color: VARIABLES.clrWhite,
    },
    homeCardBodyText: {
        color: VARIABLES.clrWhite,
        marginBottom: 10,
    },
    
    // -----------------------
    // dashboard projects card
    projectsContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: VARIABLES.clrBgDark,
    },
    projectCard: {
        flex: 1,
        width: VARIABLES.windowWidth - 20,
        marginVertical: 10,
        backgroundColor: VARIABLES.clrShdwThrd,
        borderRadius: 18,
        shadowColor: VARIABLES.clrBlack,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
    },
    projectCardTopColor: {
        backgroundColor: '#1AE46B',
        height: 15,
        width: '70%',
        borderTopLeftRadius: 18,
        borderBottomRightRadius: 18,
    },
    projectCardTop: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    projectCardName: {
        paddingHorizontal: 10,
        color: VARIABLES.clrWhite,
        fontWeight: 'bold',
    },
    projectCardBody: {
        paddingBottom: 5,
        paddingHorizontal: 10,
    },
    projectCardDescription: {
        marginVertical: 5,
        color: VARIABLES.clrWhite,
    },
    projectCardLanguages: {
        paddingVertical: 5,
        color: VARIABLES.clrWhite,
    },
    projectCardBottom: {
        paddingVertical: 5,
        marginHorizontal: 10,
    },
    projectCardProgress: {
        color: VARIABLES.clrWhite,
    },
    projectCardProgressBar: {
        height: 6,
        width: '100%',
        marginVertical: 5,
        backgroundColor: 'white',
        borderColor: 'transparent',
        borderRadius: 8
    },
});


export default _components;
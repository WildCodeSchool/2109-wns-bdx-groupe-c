import { StyleSheet  } from 'react-native';

import VARIABLES from './_variables';

const UserDashboardCardStyle = StyleSheet.create({
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
        
        elevation: 50,
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
    },
    homeCardMenu: {
        backgroundColor: VARIABLES.clrScnd,
        borderRadius: 12,
        color: 'red',
        elevation: 75,
    },
    homeCardMenuTitle: {
        color: VARIABLES.clrWhite,
    },
});

export default UserDashboardCardStyle;